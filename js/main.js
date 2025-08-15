// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    
    // 轮换字幕（带淡入淡出效果）
    const rotatingTexts = document.querySelectorAll('.rotating-text span');
    if (rotatingTexts.length > 0) {
        let currentTextIndex = 0;
        
        setInterval(() => {
            // 淡出当前文本
            rotatingTexts[currentTextIndex].classList.remove('active');
            
            // 更新索引到下一个文本
            currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
            
            // 淡入新的当前文本
            rotatingTexts[currentTextIndex].classList.add('active');
        }, 2000);
    }
    
    // 首页特定功能
    const characters = document.querySelectorAll('.character');
    if (characters.length > 0) {
        characters.forEach(character => {
            // 随机动画
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                const randomRotate = Math.random() * 20 - 10;
                
                character.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
            }, 2000 + Math.random() * 1000);
        });
    }
    
    // FAQ页面交互
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // 切换当前项的活动状态
                item.classList.toggle('active');
                
                // 关闭其他项
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // 视频播放器功能
    const watchTrailerBtn = document.getElementById('watchTrailerBtn');
    const videoModal = document.getElementById('videoModal');
    const videoModalClose = document.getElementById('videoModalClose');
    const videoModalOverlay = document.getElementById('videoModalOverlay');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (watchTrailerBtn && videoModal) {
        // 打开视频播放器
        watchTrailerBtn.addEventListener('click', function() {
            videoModal.classList.add('active');
            // 确保视频从头开始播放
            if (videoPlayer) {
                videoPlayer.currentTime = 0;
                // 延迟播放以确保模态窗口完全显示
                setTimeout(() => {
                    videoPlayer.play().catch(e => {
                        console.log('自动播放被阻止，用户需要手动播放');
                    });
                }, 300);
            }
            
            // 防止页面滚动
            document.body.style.overflow = 'hidden';
        });
        
        // 关闭视频播放器的函数
        function closeVideoModal() {
            videoModal.classList.remove('active');
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
            }
            
            // 恢复页面滚动
            document.body.style.overflow = '';
        }
        
        // 点击关闭按钮
        if (videoModalClose) {
            videoModalClose.addEventListener('click', closeVideoModal);
        }
        
        // 点击背景遮罩关闭
        if (videoModalOverlay) {
            videoModalOverlay.addEventListener('click', closeVideoModal);
        }
        
        // 按ESC键关闭
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
        
        // 视频播放结束后的处理
        if (videoPlayer) {
            videoPlayer.addEventListener('ended', function() {
                // 视频播放结束后可以选择关闭模态窗口或重置播放
                setTimeout(closeVideoModal, 2000); // 2秒后自动关闭
            });
        }
    }
});