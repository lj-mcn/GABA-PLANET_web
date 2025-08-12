// AI客服聊天机器人
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        
        // Coze API 配置
        this.apiKey = 'pat_h0Ctzn0RpMe62ZZp8XcflNFQdCz7GxSDnaWwoFIidHdbCDfl7LE4wMRfXrlncVGq';
        this.apiUrl = 'https://api.coze.cn/v1/workflow/stream_run';
        this.workflowId = '7534272842675126308';
        this.retryCount = 0;
        this.maxRetries = 2;
        
        this.initElements();
        this.bindEvents();
        this.initWelcomeMessage();
        
        // 检查 API 配置
        if (!this.apiKey || !this.workflowId) {
            console.warn('Coze API 配置不完整，AI 功能将不可用');
        }
    }
    
    initElements() {
        this.container = document.getElementById('chatbotContainer');
        this.toggle = document.getElementById('chatbotToggle');
        this.window = document.getElementById('chatbotWindow');
        this.closeBtn = document.getElementById('chatbotClose');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('chatbotSend');
        this.typingIndicator = document.getElementById('chatbotTyping');
    }
    
    bindEvents() {
        // 打开/关闭聊天窗口
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        
        // 发送消息
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // 点击窗口外部关闭
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.container.contains(e.target)) {
                this.closeChat();
            }
        });
        
        // 防止输入框失焦
        this.input.addEventListener('focus', () => {
            setTimeout(() => {
                this.scrollToBottom();
            }, 300);
        });
    }
    
    initWelcomeMessage() {
        const welcomeTime = new Date();
        const timeStr = this.formatTime(welcomeTime);
        const welcomeMessage = this.messagesContainer.querySelector('.bot-message .message-time');
        if (welcomeMessage) {
            welcomeMessage.textContent = timeStr;
        }
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        this.isOpen = true;
        this.window.classList.add('active');
        this.input.focus();
        this.scrollToBottom();
    }
    
    closeChat() {
        this.isOpen = false;
        this.window.classList.remove('active');
    }
    
    async sendMessage() {
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;
        
        // 添加用户消息
        this.addMessage(message, 'user');
        this.input.value = '';
        
        // 显示正在输入状态
        this.showTyping();
        
        try {
            // 发送到 Coze API
            const response = await this.callCozeAPIWithRetry(message);
            
            // 隐藏输入状态
            this.hideTyping();
            
            // 添加 AI 回复
            this.addMessage(response, 'bot');
            
        } catch (error) {
            console.error('发送消息失败:', error);
            this.hideTyping();
            
            // 根据语言显示错误回复
            const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'zh';
            const isEnglish = currentLang === 'en';
            
            let errorMessage = isEnglish ? 'Sorry, I am unable to reply to your message right now.' : '抱歉，我现在无法回复您的消息。';
            
            if (!this.apiKey || !this.workflowId) {
                errorMessage = isEnglish ? 
                    'Sorry, AI service is not configured. Please contact administrator to set up Coze API configuration.' :
                    '抱歉，AI 服务尚未配置。请联系管理员设置 Coze API 配置。';
            } else if (error.message.includes('401')) {
                errorMessage = isEnglish ? 
                    'Sorry, API key may be expired or insufficient permissions. Please check configuration or try again later.' :
                    '抱歉，API 密钥可能过期或权限不足。请检查配置或稍后重试。';
            } else if (error.message.includes('4101')) {
                errorMessage = isEnglish ? 
                    'Sorry, Personal Access Token does not have permission to access this workflow. Please check Token permissions in Coze platform.' :
                    '抱歉，Personal Access Token 没有访问该工作流的权限。请检查Coze平台的Token权限设置。';
            } else if (error.message.includes('429')) {
                errorMessage = isEnglish ? 
                    'Sorry, too many requests. Please try again later.' :
                    '抱歉，请求过于频繁，请稍后再试。';
            } else if (error.message.includes('quota') || error.message.includes('limit')) {
                errorMessage = isEnglish ? 
                    'Sorry, API usage quota has been exhausted. Please try again later.' :
                    '抱歉，API 使用额度已用完。请稍后再试。';
            }
            
            this.addMessage(errorMessage, 'bot');
        }
    }
    
    async callCozeAPIWithRetry(message, attempt = 1) {
        try {
            return await this.callCozeAPI(message);
        } catch (error) {
            console.error(`🔄 API调用失败 (尝试 ${attempt}/${this.maxRetries + 1}):`, error.message);
            
            // 如果是401错误且还有重试次数，等待后重试
            if (error.message.includes('401') && attempt <= this.maxRetries) {
                console.log(`⏳ 等待 ${attempt * 2} 秒后重试...`);
                await this.sleep(attempt * 2000); // 递增等待时间
                return this.callCozeAPIWithRetry(message, attempt + 1);
            }
            
            // 如果是429限流错误，等待更长时间后重试
            if (error.message.includes('429') && attempt <= this.maxRetries) {
                console.log(`🚦 遇到限流，等待 ${attempt * 5} 秒后重试...`);
                await this.sleep(attempt * 5000);
                return this.callCozeAPIWithRetry(message, attempt + 1);
            }
            
            throw error;
        }
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async callCozeAPI(message) {
        if (!this.apiKey || !this.workflowId) {
            throw new Error('API 配置不完整');
        }
        
        // 获取当前语言设置
        const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'zh';
        const isEnglish = currentLang === 'en';
        
        // 根据语言调整消息和上下文
        const processedMessage = isEnglish ? message : message;
        const userLabel = isEnglish ? 'User' : '用户';
        const aiLabel = isEnglish ? 'AI' : 'AI';
        
        // 构建请求数据 - 根据你的工作流输入参数调整
        const requestData = {
            workflow_id: this.workflowId,
            parameters: {
                // 尝试不同的参数名，你的工作流可能期望这些参数之一：
                query: processedMessage,
                user_input: processedMessage,
                question: processedMessage,
                input: processedMessage,
                message: processedMessage,
                language: currentLang, // 告诉AI当前语言
                // 添加对话历史作为上下文
                history: this.messages.slice(-5).map(msg => `${msg.type === 'user' ? userLabel : aiLabel}: ${msg.text}`).join('\n')
            }
        };
        
        console.log('📝 请求参数详情:', JSON.stringify(requestData, null, 2));
        
        try {
            console.log('🚀 发送请求到Coze:', {
                url: this.apiUrl,
                data: requestData
            });
            
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(requestData)
            });
            
            console.log('📡 API响应状态:', response.status);
            console.log('📄 响应头:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ API错误详情:', {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText
                });
                
                let errorData = {};
                try {
                    errorData = JSON.parse(errorText);
                } catch (e) {
                    // 无法解析为JSON
                }
                
                throw new Error(`API 错误 ${response.status}: ${errorData.error?.message || errorData.msg || errorText || '请求失败'}`);
            }
            
            // 处理流式响应
            const contentType = response.headers.get('content-type') || '';
            console.log('📦 响应类型:', contentType);
            
            if (contentType.includes('text/stream') || contentType.includes('text/event-stream')) {
                return await this.handleStreamResponse(response);
            } else {
                // 处理普通响应
                const data = await response.json();
                console.log('💬 API响应数据:', data);
                return this.extractCozeResponse(data);
            }
            
        } catch (error) {
            console.error('💥 Coze API 调用失败:', error);
            throw error;
        }
    }
    
    async handleStreamResponse(response) {
        console.log('🌊 开始处理流式响应');
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let result = '';
        let buffer = '';
        
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    console.log('✅ 流式响应读取完成');
                    break;
                }
                
                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;
                console.log('📦 收到数据块:', chunk);
                
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // 保留最后一个不完整的行
                
                for (const line of lines) {
                    console.log('📄 处理行:', line);
                    
                    if (line.trim() === '') continue; // 跳过空行
                    
                    if (line.startsWith('data: ')) {
                        const dataStr = line.slice(6).trim();
                        console.log('🔍 解析数据:', dataStr);
                        
                        if (dataStr === '[DONE]') {
                            console.log('🏁 收到结束标志');
                            break;
                        }
                        
                        try {
                            const data = JSON.parse(dataStr);
                            console.log('📊 解析后的数据:', data);
                            
                            // 检查是否是错误事件
                            if (data.error_code || data.error_message) {
                                console.error('❌ Coze API 错误:', data);
                                throw new Error(`Coze错误 ${data.error_code}: ${data.error_message}`);
                            }
                            
                            // 尝试各种可能的Coze事件格式
                            if (data.event === 'Message' || data.event === 'message') {
                                let content = data.data?.content || data.content;
                                
                                // 尝试解析双重编码的JSON
                                if (content && typeof content === 'string') {
                                    try {
                                        const parsed = JSON.parse(content);
                                        if (parsed.output) {
                                            content = parsed.output;
                                        }
                                    } catch (e) {
                                        // 如果不是JSON，保持原内容
                                    }
                                }
                                
                                if (content) {
                                    result = content; // 使用 = 而不是 +=，因为这是完整回复
                                    console.log('💬 提取消息内容:', result);
                                }
                            } else if (data.event === 'Done' || data.event === 'done' || data.event === 'finish') {
                                console.log('🏁 工作流完成');
                                // Done事件通常只是标记结束，不包含内容
                                break;
                            } else if (data.event === 'workflow.finish') {
                                // Coze工作流完成事件
                                if (data.data?.output) {
                                    result = data.data.output;
                                    console.log('🎯 工作流完成，结果:', result);
                                    break;
                                }
                            } else {
                                // 其他事件类型，尝试提取内容
                                let possibleContent = data.data?.output || data.data?.content || data.content || data.output;
                                
                                // 尝试解析双重编码的JSON
                                if (possibleContent && typeof possibleContent === 'string') {
                                    try {
                                        const parsed = JSON.parse(possibleContent);
                                        if (parsed.output) {
                                            possibleContent = parsed.output;
                                        }
                                    } catch (e) {
                                        // 如果不是JSON，保持原内容
                                    }
                                    
                                    result = possibleContent;
                                    console.log('🔄 其他事件内容:', possibleContent);
                                }
                            }
                        } catch (e) {
                            console.warn('⚠️ JSON解析失败:', e.message, 'for data:', dataStr);
                            continue;
                        }
                    } else if (line.startsWith('event: ') || line.startsWith('id: ') || line.startsWith('retry: ')) {
                        // SSE元数据，跳过
                        continue;
                    } else {
                        // 可能是纯文本响应
                        console.log('📝 纯文本行:', line);
                        if (line.trim()) {
                            result += line.trim() + '\n';
                        }
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }
        
        console.log('🎉 流式处理完成，最终结果:', result);
        return result.trim() || '抱歉，我没有收到有效的回复。';
    }
    
    extractCozeResponse(data) {
        console.log('🔍 解析Coze响应:', data);
        
        // 尝试各种可能的响应格式
        const possiblePaths = [
            data.data?.output,
            data.output,
            data.data?.content,
            data.content,
            data.data?.result,
            data.result,
            data.data?.message,
            data.message,
            data.data?.response,
            data.response,
            data.data,
            // 如果data本身就是字符串
            typeof data === 'string' ? data : null
        ];
        
        for (const content of possiblePaths) {
            if (content && typeof content === 'string' && content.trim()) {
                console.log('✅ 找到回复内容:', content);
                return content.trim();
            }
        }
        
        // 如果都没找到，记录完整响应结构
        console.warn('❓ 未识别的Coze响应格式，完整数据:', JSON.stringify(data, null, 2));
        return `调试信息：收到响应但格式未识别。响应类型：${typeof data}，键值：${Object.keys(data || {}).join(', ')}`;
    }
    
    addMessage(text, type) {
        const message = {
            text,
            type,
            timestamp: new Date()
        };
        
        this.messages.push(message);
        
        const messageElement = this.createMessageElement(message);
        this.messagesContainer.appendChild(messageElement);
        
        this.scrollToBottom();
    }
    
    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type === 'user' ? 'user-message' : 'bot-message'}`;
        
        const avatar = message.type === 'user' ? '👤' : '🤖';
        const timeStr = this.formatTime(message.timestamp);
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-text">${this.escapeHtml(message.text)}</div>
                <div class="message-time">${timeStr}</div>
            </div>
        `;
        
        return messageDiv;
    }
    
    showTyping() {
        this.isTyping = true;
        this.typingIndicator.style.display = 'flex';
        this.sendBtn.disabled = true;
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.isTyping = false;
        this.typingIndicator.style.display = 'none';
        this.sendBtn.disabled = false;
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }
    
    formatTime(date) {
        return date.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 页面加载完成后初始化聊天机器人
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否存在聊天机器人容器
    if (document.getElementById('chatbotContainer')) {
        window.chatbot = new Chatbot();
        
        // 开发模式提示
        if (!window.chatbot.apiKey || !window.chatbot.workflowId) {
            console.log(`
🤖 AI客服功能已加载但配置不完整 / AI Customer Service Loaded but Configuration Incomplete

要启用 Coze AI 功能，请：/ To enable Coze AI features:
1. 在 js/chatbot.js 中填入您的 Workflow ID / Fill in your Workflow ID in js/chatbot.js
2. API Key 已配置: ${window.chatbot.apiKey ? '✅' : '❌'} / API Key configured: ${window.chatbot.apiKey ? '✅' : '❌'}
3. Workflow ID: ${window.chatbot.workflowId ? '✅' : '❌ 需要填入'} / Workflow ID: ${window.chatbot.workflowId ? '✅' : '❌ Required'}
4. 刷新页面即可使用 AI 客服功能 / Refresh page to use AI customer service

当前状态：UI 功能正常，需要完整配置才能使用 AI 回复 / Current Status: UI functional, complete configuration required for AI responses
            `);
        }
    }
});

// 导出类以供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Chatbot;
}