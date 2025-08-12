// 国际化系统 (Internationalization)
class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'zh';
        this.isInitialized = false;
        this.translations = {
            zh: {
                // 导航菜单
                'nav.home': '首页',
                'nav.download': '下载灵境',
                'nav.blog': '博客',
                'nav.about': '关于灵境',
                'nav.faq': '常见问题',
                'nav.careers': '职业',
                'nav.contact': '联系我们',
                'nav.wechat': '微信',
                'nav.douyin': '抖音',
                
                // 首页内容
                'home.title': '灵境 - 探索无限可能',
                'home.rotating.text1': '165465',
                'home.rotating.text2': '灵境理解我的每一个想法',
                'home.brand.text': '灵境',
                'home.brand.signature': 'a adventure',
                'home.learn.more': '了解更多信息',
                'home.watch.trailer': '观看预告片',
                'home.app.store': '在应用商店',
                
                // 视频播放器
                'video.title': '灵境预告片',
                'video.description': '探索无限可能的精彩世界',
                'video.not.supported': '您的浏览器不支持视频播放。',
                
                // AI客服
                'chatbot.title': 'AI助手',
                'chatbot.name': '灵境AI助手',
                'chatbot.status': '在线',
                'chatbot.welcome': '你好！我是灵境AI助手，很高兴为您服务。请问有什么可以帮助您的吗？',
                'chatbot.placeholder': '输入您的问题...',
                'chatbot.typing': 'AI助手正在思考...',
                
                // 语言切换
                'lang.current': '中文',
                'lang.switch': 'English',
                
                // 通用
                'brand.name': '灵境',
                'loading': '加载中...',
                'error': '出错了',
                'close': '关闭',
                
                // 关于页面
                'about.title': '灵境 - 关于我们',
                'about.page_title': '关于灵境',
                'about.story_title': '我们的故事',
                'about.mission_title': '我们的使命',
                'about.team_title': '我们的团队',
                
                // 联系页面
                'contact.title': '灵境 - 联系我们',
                'contact.page_title': '联系我们',
                'contact.email_label': '电子邮件',
                'contact.wechat_label': '微信',
                'contact.address_label': '办公地址',
                'contact.send_email': '发送邮件',
                
                // 职业页面
                'careers.title': '灵境 - 职业',
                'careers.page_title': '职业',
                'careers.apply_button': '申请职位',
                
                // 常见问题页面
                'faq.title': '灵境 - 常见问题',
                'faq.page_title': '常见问题',
                
                // 博客页面
                'blog.title': '灵境 - 博客',
                'blog.page_title': '博客',
                'blog.author_prefix': '作者: ',
                'blog.read_more': '阅读更多',
                'blog.back_to_all': '← 返回所有文章',
                'blog.more_posts': '更多文章',
                
                // 页脚
                'footer.about_us': '关于我们',
                'footer.contact_us': '联系我们',
                'footer.terms': '条款',
                'footer.privacy': '隐私策略',
                'footer.discord': '不和',
                'footer.instagram': 'Instagram',
                'footer.douyin': '抖音'
            },
            en: {
                // 导航菜单
                'nav.home': 'Home',
                'nav.download': 'Download Lingjing',
                'nav.blog': 'Blog',
                'nav.about': 'About Lingjing',
                'nav.faq': 'FAQ',
                'nav.careers': 'Careers',
                'nav.contact': 'Contact Us',
                'nav.wechat': 'WeChat',
                'nav.douyin': 'Douyin',
                
                // 首页内容
                'home.title': 'Lingjing - Explore Infinite Possibilities',
                'home.rotating.text1': '165465',
                'home.rotating.text2': 'Lingjing understands every thought of mine',
                'home.brand.text': 'Lingjing',
                'home.brand.signature': 'a adventure',
                'home.learn.more': 'Learn More',
                'home.watch.trailer': 'Watch Trailer',
                'home.app.store': 'App Store',
                
                // 视频播放器
                'video.title': 'Lingjing Trailer',
                'video.description': 'Explore the wonderful world of infinite possibilities',
                'video.not.supported': 'Your browser does not support video playback.',
                
                // AI客服
                'chatbot.title': 'AI Assistant',
                'chatbot.name': 'Lingjing AI Assistant',
                'chatbot.status': 'Online',
                'chatbot.welcome': 'Hello! I am Lingjing AI Assistant, glad to serve you. How can I help you?',
                'chatbot.placeholder': 'Type your question...',
                'chatbot.typing': 'AI Assistant is thinking...',
                
                // 语言切换
                'lang.current': 'English',
                'lang.switch': '中文',
                
                // 通用
                'brand.name': 'Lingjing',
                'loading': 'Loading...',
                'error': 'An error occurred',
                'close': 'Close',
                
                // 关于页面
                'about.title': 'Lingjing - About Us',
                'about.page_title': 'About Lingjing',
                'about.story_title': 'Our Story',
                'about.mission_title': 'Our Mission',
                'about.team_title': 'Our Team',
                
                // 联系页面
                'contact.title': 'Lingjing - Contact Us',
                'contact.page_title': 'Contact Us',
                'contact.email_label': 'Email',
                'contact.wechat_label': 'WeChat',
                'contact.address_label': 'Office Address',
                'contact.send_email': 'Send Email',
                
                // 职业页面
                'careers.title': 'Lingjing - Careers',
                'careers.page_title': 'Careers',
                'careers.apply_button': 'Apply for Position',
                
                // 常见问题页面
                'faq.title': 'Lingjing - FAQ',
                'faq.page_title': 'Frequently Asked Questions',
                
                // 博客页面
                'blog.title': 'Lingjing - Blog',
                'blog.page_title': 'Blog',
                'blog.author_prefix': 'Author: ',
                'blog.read_more': 'Read More',
                'blog.back_to_all': '← Back to All Articles',
                'blog.more_posts': 'More Articles',
                
                // 页脚
                'footer.about_us': 'About Us',
                'footer.contact_us': 'Contact Us',
                'footer.terms': 'Terms',
                'footer.privacy': 'Privacy Policy',
                'footer.discord': 'Discord',
                'footer.instagram': 'Instagram',
                'footer.douyin': 'Douyin'
            }
        };
        
        this.init();
    }
    
    init() {
        // 延迟初始化，确保DOM完全加载
        setTimeout(() => {
            this.bindEvents();
            this.updateLanguage();
            this.isInitialized = true;
            console.log('🌐 国际化系统初始化完成，当前语言:', this.currentLanguage);
        }, 100);
    }
    
    bindEvents() {
        const langSwitcher = document.getElementById('langSwitcher');
        if (langSwitcher) {
            langSwitcher.addEventListener('click', () => {
                this.switchLanguage();
            });
        }
    }
    
    switchLanguage() {
        this.currentLanguage = this.currentLanguage === 'zh' ? 'en' : 'zh';
        localStorage.setItem('language', this.currentLanguage);
        
        // 更新HTML语言属性
        document.documentElement.setAttribute('lang', this.currentLanguage === 'zh' ? 'zh-CN' : 'en');
        
        this.updateLanguage();
        
        console.log('🔄 语言已切换到:', this.currentLanguage);
        
        // 刷新AI客服的语言（如果存在）
        if (window.chatbot) {
            this.updateChatbotLanguage();
        }
    }
    
    updateLanguage() {
        // 更新页面标题
        this.updatePageTitle();
        
        // 更新所有带有 data-i18n 属性的元素
        this.updateElements();
        
        // 更新语言切换按钮
        this.updateLanguageSwitcher();
        
        // 更新页面特定内容
        this.updatePageSpecificContent();
    }
    
    updatePageTitle() {
        const titleKey = document.documentElement.getAttribute('data-title-key') || 'home.title';
        document.title = this.t(titleKey);
    }
    
    updateElements() {
        const elements = document.querySelectorAll('[data-i18n]');
        console.log(`🔍 找到 ${elements.length} 个需要翻译的元素`);
        
        elements.forEach((element, index) => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            console.log(`📝 翻译 ${index + 1}: "${key}" → "${translation}"`);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
    }
    
    updateLanguageSwitcher() {
        const currentLang = document.getElementById('currentLang');
        if (currentLang) {
            currentLang.textContent = this.t('lang.current');
        }
    }
    
    updatePageSpecificContent() {
        // 更新轮换文本
        this.updateRotatingText();
        
        // 更新导航菜单
        this.updateNavigation();
        
        // 更新品牌元素
        this.updateBrandElements();
    }
    
    updateRotatingText() {
        const rotatingTexts = document.querySelectorAll('.rotating-text span');
        if (rotatingTexts.length >= 2) {
            rotatingTexts[0].textContent = `"${this.t('home.rotating.text1')}"`;
            rotatingTexts[1].textContent = `"${this.t('home.rotating.text2')}"`;
        }
    }
    
    updateNavigation() {
        // 更新侧边栏导航
        const menuItems = document.querySelectorAll('.menu-items a');
        const navKeys = [
            'nav.home', 'nav.download', 'nav.blog', 'nav.about', 
            'nav.faq', 'nav.careers', 'nav.contact', 'nav.wechat', 'nav.douyin'
        ];
        
        menuItems.forEach((item, index) => {
            if (navKeys[index]) {
                item.textContent = this.t(navKeys[index]);
            }
        });
    }
    
    updateBrandElements() {
        // 更新品牌文字
        const brandText = document.querySelector('.brand-text');
        if (brandText) {
            brandText.textContent = this.t('home.brand.text');
        }
        
        // 更新品牌签名
        const brandSignature = document.querySelector('.brand-signature');
        if (brandSignature) {
            brandSignature.textContent = this.t('home.brand.signature');
        }
    }
    
    updateChatbotLanguage() {
        // 更新AI客服的欢迎消息
        const welcomeMessage = document.querySelector('.bot-message .message-text');
        if (welcomeMessage) {
            welcomeMessage.textContent = this.t('chatbot.welcome');
        }
        
        // 更新客服名称
        const chatbotName = document.querySelector('.chatbot-name');
        if (chatbotName) {
            chatbotName.textContent = this.t('chatbot.name');
        }
        
        // 更新状态
        const chatbotStatus = document.querySelector('.chatbot-status');
        if (chatbotStatus) {
            chatbotStatus.textContent = this.t('chatbot.status');
        }
        
        // 更新输入框占位符
        const chatInput = document.getElementById('chatbotInput');
        if (chatInput) {
            chatInput.placeholder = this.t('chatbot.placeholder');
        }
        
        // 更新按钮文字
        const chatbotText = document.querySelector('.chatbot-text');
        if (chatbotText) {
            chatbotText.textContent = this.t('chatbot.title');
        }
        
        // 更新输入状态文字
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            typingText.textContent = this.t('chatbot.typing');
        }
    }
    
    // 翻译方法
    t(key) {
        if (!key) return '';
        
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        if (!value) {
            console.warn(`⚠️ 翻译键未找到: "${key}" (语言: ${this.currentLanguage})`);
            return key; // 如果找不到翻译，返回原key
        }
        
        return value;
    }
    
    // 获取当前语言
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // 检查是否为中文
    isZh() {
        return this.currentLanguage === 'zh';
    }
    
    // 检查是否为英文
    isEn() {
        return this.currentLanguage === 'en';
    }
}

// 页面加载完成后初始化国际化系统
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 正在初始化国际化系统...');
    window.i18n = new I18n();
    
    // 确保语言切换按钮正确显示
    setTimeout(() => {
        if (window.i18n && window.i18n.isInitialized) {
            console.log('✅ 国际化系统初始化完成');
        } else {
            console.warn('⚠️ 国际化系统初始化可能失败');
        }
    }, 500);
});

// 导出类以供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}