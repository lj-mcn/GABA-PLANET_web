// 简化版国际化系统
window.i18nData = {
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
        'home.brand.text': '嘎巴星球',
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
        
        // About页面
        'about.title': '关于灵境 - 灵境',
        'about.page_title': '关于我们',
        'about.story_title': '我们的故事',
        'about.mission_title': '我们的使命',
        'about.team_title': '团队介绍',
        
        // Contact页面
        'contact.title': '联系我们 - 灵境',
        'contact.page_title': '联系我们',
        'contact.email_label': '邮箱',
        'contact.wechat_label': '微信',
        'contact.address_label': '地址',
        'contact.send_email': '发送邮件',
        
        // Careers页面
        'careers.title': '职业机会 - 灵境',
        'careers.page_title': '加入我们',
        'careers.apply_button': '申请职位',
        
        // FAQ页面
        'faq.title': '常见问题 - 灵境',
        'faq.page_title': '常见问题',
        
        // Blog页面
        'blog.title': '博客 - 灵境',
        'blog.page_title': '博客',
        'blog.author_prefix': '作者：',
        'blog.read_more': '阅读更多',
        'blog.back_to_all': '返回所有文章',
        'blog.more_posts': '更多文章',
        
        // Footer
        'footer.about_us': '关于我们',
        'footer.contact_us': '联系我们',
        'footer.terms': '服务条款',
        'footer.privacy': '隐私政策',
        'footer.discord': 'Discord',
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
        'home.brand.text': 'Gaba Planet',
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
        
        // About页面
        'about.title': 'About Lingjing - Lingjing',
        'about.page_title': 'About Us',
        'about.story_title': 'Our Story',
        'about.mission_title': 'Our Mission',
        'about.team_title': 'Meet the Team',
        
        // Contact页面
        'contact.title': 'Contact Us - Lingjing',
        'contact.page_title': 'Contact Us',
        'contact.email_label': 'Email',
        'contact.wechat_label': 'WeChat',
        'contact.address_label': 'Address',
        'contact.send_email': 'Send Email',
        
        // Careers页面
        'careers.title': 'Careers - Lingjing',
        'careers.page_title': 'Join Us',
        'careers.apply_button': 'Apply Now',
        
        // FAQ页面
        'faq.title': 'FAQ - Lingjing',
        'faq.page_title': 'Frequently Asked Questions',
        
        // Blog页面
        'blog.title': 'Blog - Lingjing',
        'blog.page_title': 'Blog',
        'blog.author_prefix': 'By: ',
        'blog.read_more': 'Read More',
        'blog.back_to_all': 'Back to All Posts',
        'blog.more_posts': 'More Posts',
        
        // Footer
        'footer.about_us': 'About Us',
        'footer.contact_us': 'Contact Us',
        'footer.terms': 'Terms of Service',
        'footer.privacy': 'Privacy Policy',
        'footer.discord': 'Discord',
        'footer.instagram': 'Instagram',
        'footer.douyin': 'Douyin'
    }
};

// 简化的国际化类
class SimpleI18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'zh';
        this.init();
    }
    
    init() {
        console.log('🌐 简化版国际化系统初始化，当前语言:', this.currentLanguage);
        this.bindEvents();
        this.updateLanguage();
    }
    
    bindEvents() {
        const langSwitcher = document.getElementById('langSwitcher');
        if (langSwitcher) {
            langSwitcher.addEventListener('click', () => {
                this.switchLanguage();
            });
            console.log('✅ 语言切换按钮绑定成功');
        } else {
            console.warn('⚠️ 未找到语言切换按钮');
        }
    }
    
    switchLanguage() {
        this.currentLanguage = this.currentLanguage === 'zh' ? 'en' : 'zh';
        localStorage.setItem('language', this.currentLanguage);
        console.log('🔄 切换语言到:', this.currentLanguage);
        this.updateLanguage();
    }
    
    updateLanguage() {
        console.log('🔄 开始更新语言显示');
        
        // 更新页面标题
        const titleKey = document.documentElement.getAttribute('data-title-key') || 'home.title';
        document.title = this.t(titleKey);
        
        // 更新所有翻译元素
        this.updateElements();
        
        // 更新语言切换按钮
        this.updateLanguageSwitcher();
        
        // 更新轮换文本
        this.updateRotatingText();
        
        // 更新品牌图片
        this.updateBrandImage();
        
        console.log('✅ 语言更新完成');
    }
    
    updateElements() {
        const elements = document.querySelectorAll('[data-i18n]');
        console.log(`🔍 找到 ${elements.length} 个需要翻译的元素`);
        
        elements.forEach((element, index) => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
            
            console.log(`📝 ${index + 1}. "${key}" → "${translation}"`);
        });
    }
    
    updateLanguageSwitcher() {
        const currentLang = document.getElementById('currentLang');
        if (currentLang) {
            currentLang.textContent = this.t('lang.current');
            console.log('🌐 语言按钮文字已更新:', this.t('lang.current'));
        }
    }
    
    updateRotatingText() {
        const rotatingTexts = document.querySelectorAll('.rotating-text span');
        if (rotatingTexts.length >= 2) {
            rotatingTexts[0].textContent = `"${this.t('home.rotating.text1')}"`;
            rotatingTexts[1].textContent = `"${this.t('home.rotating.text2')}"`;
            console.log('🔄 轮换文本已更新');
        }
    }
    
    updateBrandImage() {
        const brandImage = document.getElementById('brandImage');
        if (brandImage) {
            if (this.currentLanguage === 'zh') {
                brandImage.src = 'images/GABA CHINESE.png';
                brandImage.alt = 'Gaba Chinese';
            } else {
                brandImage.src = 'images/GABA PLANET.png';
                brandImage.alt = 'Gaba Planet';
            }
            console.log('🖼️ 品牌图片已更新为:', brandImage.src);
        }
    }
    
    t(key) {
        if (!key) return '';
        
        const translation = window.i18nData[this.currentLanguage]?.[key];
        if (!translation) {
            console.warn(`⚠️ 翻译未找到: "${key}"`);
            return key;
        }
        return translation;
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// 立即初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM加载完成，初始化国际化系统');
    window.i18n = new SimpleI18n();
    
    // 延迟确认初始化是否成功
    setTimeout(() => {
        if (window.i18n) {
            console.log('✅ 国际化系统初始化成功');
        }
    }, 200);
});