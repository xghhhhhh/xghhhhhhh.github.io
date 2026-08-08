/* ========================================================================
   🌾 Stardew Valley Style Personal Profile — Script
   Features: Edit Mode, CRUD Cards, Visitor Counter, LocalStorage, Konami Code
   ======================================================================== */

(function () {
    'use strict';

    // ======================== 数据存储 ========================
    const STORAGE_KEY = 'stardew_profile_data_v1';
    const VISITOR_KEY = 'stardew_visitor_count_v1';

    // 默认数据
    const defaultData = {
        // 个人信息
        profile: {
            name: '你的名字',
            subtitle: '🎓 院校名称 · 大三 · 寻找实习中',
            intent: '🎯 求职意向：AI产品经理 / AI业务产品实习生',
            welcome: '欢迎来到我的星露谷！这里记录着我的实践项目、成长感悟和工具收藏。就像经营农场一样，每一天都在播种新的技能，收获新的认知。希望你在这里能找到一些有趣的东西！'
        },
        // 联系方式
        contact: {
            email: 'your@email.com',
            github: '@yourusername',
            huggingface: '@yourusername',
            wechat: 'your_wechat_id'
        },
        // 实践项目
        projects: [
            {
                id: 'p1',
                icon: 'fas fa-robot',
                iconColor: 'green',
                title: 'Laser Agent Pro',
                subtitle: 'AI 激光参数推荐系统',
                body: '基于置信度加权的反思型 AI Agent，融合专家种子库、社区历史数据和 LLM 推理，为激光雕刻提供安全参数推荐。具备安全熔断、视觉 RAG、反馈闭环三大核心能力。',
                tags: ['FastAPI', 'Gradio', '贝叶斯推理', 'RAG', 'SQLite'],
                links: [
                    { text: 'GitHub', url: 'https://github.com/', type: 'primary' },
                    { text: 'HuggingFace', url: 'https://huggingface.co/', type: 'secondary' }
                ]
            },
            {
                id: 'p2',
                icon: 'fas fa-brain',
                iconColor: 'purple',
                title: '星露谷风格个人主页',
                subtitle: '像素风互动简历',
                body: '参照星露谷物语的暖色调 UI 风格，构建可自主编辑的个人展示页面。支持编辑模式、卡片 CRUD、访客计数、留言板等互动功能，纯前端实现，零部署成本。',
                tags: ['HTML/CSS', 'JavaScript', 'LocalStorage', '像素风 UI'],
                links: [
                    { text: '预览', url: '#', type: 'primary' }
                ]
            },
            {
                id: 'p3',
                icon: 'fas fa-chart-line',
                iconColor: 'orange',
                title: 'AI 提效工作流研究',
                subtitle: '方法论 + 工具链',
                body: '系统梳理 AI Coding（Cursor/Claude Code）、AI 产品设计、Prompt Engineering 的最佳实践。输出标准化工作流模板，帮助团队将 AI 融入日常产品开发流程。',
                tags: ['AI Workflow', 'Prompt Eng', '产品设计', '效率工具'],
                links: [
                    { text: '查看文档', url: '#', type: 'primary' }
                ]
            }
        ],
        // 感悟随笔
        thoughts: [
            {
                id: 't1',
                icon: 'fas fa-shield-alt',
                iconColor: 'red',
                title: '安全不是功能，是信任',
                subtitle: '工程伦理随笔',
                body: '在做 Laser Agent Pro 时，我意识到"安全熔断"不是一项功能，而是对用户的承诺。当 AI 说"我不建议切割 PVC"时，它在用确定性守护生命。Fail-Safe 原则应该成为每一个 AI 产品的底线思维。',
                tags: ['AI安全', '工程伦理', '产品设计']
            },
            {
                id: 't2',
                icon: 'fas fa-paint-brush',
                iconColor: 'gold',
                title: '为什么我用星露谷风格做网站',
                subtitle: '设计思考',
                body: '星露谷的魅力在于"温暖的秩序感"——像素是规整的，但色彩是温柔的。这种矛盾统一恰好适合个人主页：信息需要结构化，但人格需要温度。暖色调木质 UI 比冷冰冰的极简风更能传递"人"的存在。',
                tags: ['UI设计', '星露谷', '个人品牌']
            },
            {
                id: 't3',
                icon: 'fas fa-handshake',
                iconColor: 'blue',
                title: '人机协作的正确姿势',
                subtitle: 'AI 使用心得',
                body: '真正的 AI 协作不是"让 AI 帮我做"，而是"我来决定做什么，AI 来加速怎么做"。人类提供领域知识、价值判断和系统愿景，AI 负责执行和迭代。这个分工决定了 AI 时代最核心的能力是——提问和决策。',
                tags: ['AI协作', 'Prompt', '思维方式']
            },
            {
                id: 't4',
                icon: 'fas fa-seedling',
                iconColor: 'green',
                title: '从零到一：一个开源项目的诞生',
                subtitle: '项目复盘',
                body: 'Laser Agent Pro 从一行需求变成了 33 个文件、41 项测试通过的生产级项目。最重要的经验：不要等"完美"再开始，先跑通最小闭环，让数据飞轮自己转起来。社区会帮你补齐剩下的。',
                tags: ['开源', '项目管理', 'MVP']
            },
            {
                id: 't5',
                icon: 'fas fa-star',
                iconColor: 'orange',
                title: '求职季的自我营销',
                subtitle: '职业规划',
                body: '面试官看简历只看 15 秒。这 15 秒里，他们需要确认三件事：你能做什么、你做过什么、你和团队是否匹配。一个精心设计的个人主页，能在 15 秒内同时传达这三点——前提是它本身就是你能力的证明。',
                tags: ['求职', '作品集', '自我展示']
            }
        ],
        // 工具资源
        tools: [
            { id: 'tl1', name: 'Cursor', desc: 'AI 原生代码编辑器，补全+对话一体', cat: 'ai', icon: 'fas fa-code', link: 'https://cursor.com' },
            { id: 'tl2', name: 'Claude Code', desc: 'Anthropic 官方 CLI 编程助手', cat: 'ai', icon: 'fas fa-terminal', link: 'https://claude.com' },
            { id: 'tl3', name: 'ChatGPT', desc: 'OpenAI 旗舰模型，推理+创作全能', cat: 'ai', icon: 'fas fa-comment-dots', link: 'https://chat.openai.com' },
            { id: 'tl4', name: 'Hugging Face', desc: '开源 AI 模型社区与部署平台', cat: 'ai', icon: 'fas fa-robot', link: 'https://huggingface.co' },
            { id: 'tl5', name: 'Unsplash', desc: '免费高质量摄影图片素材库', cat: 'design', icon: 'fas fa-camera', link: 'https://unsplash.com' },
            { id: 'tl6', name: 'Figma', desc: '协作式 UI 设计工具，社区模板丰富', cat: 'design', icon: 'fas fa-pencil-ruler', link: 'https://figma.com' },
            { id: 'tl7', name: 'Coolors', desc: '配色方案生成器，一键导出', cat: 'design', icon: 'fas fa-palette', link: 'https://coolors.co' },
            { id: 'tl8', name: 'Google Fonts', desc: '免费开源字体库，含像素字体', cat: 'design', icon: 'fas fa-font', link: 'https://fonts.google.com' },
            { id: 'tl9', name: 'Notion', desc: '结构化笔记 + 知识库管理', cat: 'learning', icon: 'fas fa-book', link: 'https://notion.so' },
            { id: 'tl10', name: 'Obsidian', desc: '本地优先的双链笔记工具', cat: 'learning', icon: 'fas fa-cube', link: 'https://obsidian.md' },
            { id: 'tl11', name: 'xTool Creative Space', desc: '激光雕刻设计软件，官方配套', cat: 'maker', icon: 'fas fa-cut', link: 'https://xcs.x-tool.com' },
            { id: 'tl12', name: 'Inkscape', desc: '开源矢量图形编辑器，激光切割必备', cat: 'maker', icon: 'fas fa-vector-square', link: 'https://inkscape.org' }
        ],
        // 留言
        messages: [
            { id: 'm1', text: '欢迎来到星露谷！🌾 祝你求职顺利～', avatar: '🌻', time: '2025-01-15 10:23' },
            { id: 'm2', text: 'Laser Agent Pro 太酷了，已 star！', avatar: '🦊', time: '2025-01-16 14:05' }
        ]
    };

    // ======================== 初始化 ========================
    let data = loadData();
    let editMode = false;

    function loadData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // 合并默认数据，防止新增字段丢失
                return {
                    ...defaultData,
                    ...parsed,
                    profile: { ...defaultData.profile, ...(parsed.profile || {}) },
                    contact: { ...defaultData.contact, ...(parsed.contact || {}) }
                };
            }
        } catch (e) {
            console.warn('Failed to load data:', e);
        }
        return JSON.parse(JSON.stringify(defaultData));
    }

    function saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save data:', e);
            showToast('保存失败，请检查浏览器存储设置');
        }
    }

    // ======================== 访客计数 ========================
    function initVisitorCounter() {
        let count = parseInt(localStorage.getItem(VISITOR_KEY) || '0', 10);
        count += 1;
        localStorage.setItem(VISITOR_KEY, String(count));

        const counterEl = document.getElementById('visitorCount');
        animateNumber(counterEl, 0, count, 800);
    }

    function animateNumber(el, from, to, duration) {
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.round(from + (to - from) * eased);
            el.textContent = current;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    // ======================== 渲染函数 ========================
    function renderProfile() {
        // 姓名
        const nameEl = document.querySelector('[data-editable="name"]');
        if (nameEl) nameEl.textContent = data.profile.name;

        // 副标题
        const subtitleEl = document.querySelector('[data-editable="subtitle"]');
        if (subtitleEl) subtitleEl.textContent = data.profile.subtitle;

        // 求职意向
        const intentEl = document.querySelector('[data-editable="intent"]');
        if (intentEl) intentEl.textContent = data.profile.intent;

        // 欢迎语
        const welcomeEl = document.querySelector('[data-editable="welcome"]');
        if (welcomeEl) welcomeEl.textContent = data.profile.welcome;

        // 联系方式
        const emailEl = document.querySelector('[data-editable="email"]');
        if (emailEl) emailEl.textContent = data.contact.email;

        const githubEl = document.querySelector('[data-editable="github"]');
        if (githubEl) githubEl.textContent = data.contact.github;

        const hfEl = document.querySelector('[data-editable="huggingface"]');
        if (hfEl) hfEl.textContent = data.contact.huggingface;

        const wechatEl = document.querySelector('[data-editable="wechat"]');
        if (wechatEl) wechatEl.textContent = data.contact.wechat;

        // 更新统计数字
        document.getElementById('projectCount').textContent = data.projects.length;
        document.getElementById('thoughtCount').textContent = data.thoughts.length;
        document.getElementById('toolCount').textContent = data.tools.length;

        // 更新 footer 年份和名字
        const footerMeta = document.querySelector('.footer-meta');
        if (footerMeta) {
            footerMeta.textContent = `© 2025 ${data.profile.name} · Built with 💚 and AI`;
        }
    }

    function renderProjects() {
        const grid = document.getElementById('projectGrid');
        grid.innerHTML = '';

        data.projects.forEach((proj, idx) => {
            const card = createProjectCard(proj, idx);
            grid.appendChild(card);
        });

        // 编辑模式下显示添加按钮
        if (editMode) {
            const addBtn = document.createElement('div');
            addBtn.className = 'add-card-btn';
            addBtn.innerHTML = '<i class="fas fa-plus"></i> 添加项目';
            addBtn.onclick = () => openProjectModal(null);
            grid.appendChild(addBtn);
        }
    }

    function createProjectCard(proj, idx) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${idx * 0.08}s`;

        const tagsHtml = proj.tags.map(tag => {
            const cls = tag.includes('AI') || tag.includes('Fast') || tag.includes('Gradio') ? 'blue-tag' :
                tag.includes('设计') || tag.includes('像素') ? 'purple-tag' :
                    tag.includes('安全') || tag.includes('产品') ? 'orange-tag' : '';
            return `<span class="card-tag ${cls}">${tag}</span>`;
        }).join('');

        const linksHtml = (proj.links || []).map(link =>
            `<a href="${link.url}" class="card-link ${link.type === 'secondary' ? 'secondary' : ''}" target="_blank" rel="noopener">
                <i class="fas fa-external-link-alt"></i> ${link.text}
            </a>`
        ).join('');

        card.innerHTML = `
            <button class="edit-btn" title="编辑" data-action="edit-project" data-id="${proj.id}">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <div class="card-header">
                <div class="card-icon ${proj.iconColor || 'green'}">
                    <i class="${proj.icon || 'fas fa-star'}"></i>
                </div>
                <div>
                    <div class="card-title">${proj.title}</div>
                    <div class="card-subtitle">${proj.subtitle || ''}</div>
                </div>
            </div>
            <div class="card-body">${proj.body}</div>
            <div class="card-tags">${tagsHtml}</div>
            <div class="card-links">${linksHtml}</div>
        `;

        // 编辑按钮事件
        const editBtn = card.querySelector('.edit-btn');
        editBtn.onclick = (e) => {
            e.stopPropagation();
            openProjectModal(proj.id);
        };

        return card;
    }

    function renderThoughts() {
        const grid = document.getElementById('thoughtGrid');
        grid.innerHTML = '';

        data.thoughts.forEach((thought, idx) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animationDelay = `${idx * 0.08}s`;

            const tagsHtml = thought.tags.map(tag => {
                const cls = tag.includes('AI') || tag.includes('Prompt') ? 'blue-tag' :
                    tag.includes('设计') || tag.includes('星露') ? 'purple-tag' :
                        tag.includes('开源') || tag.includes('项目') ? 'orange-tag' : '';
                return `<span class="card-tag ${cls}">${tag}</span>`;
            }).join('');

            card.innerHTML = `
                <button class="edit-btn" title="编辑" data-action="edit-thought" data-id="${thought.id}">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <div class="card-header">
                    <div class="card-icon ${thought.iconColor || 'gold'}">
                        <i class="${thought.icon || 'fas fa-book'}"></i>
                    </div>
                    <div>
                        <div class="card-title">${thought.title}</div>
                        <div class="card-subtitle">${thought.subtitle || ''}</div>
                    </div>
                </div>
                <div class="card-body">${thought.body}</div>
                <div class="card-tags">${tagsHtml}</div>
                <div class="card-links">
                    <a href="#" class="card-link" onclick="event.preventDefault()">
                        <i class="fas fa-book-open"></i> 阅读全文 →
                    </a>
                </div>
            `;

            const editBtn = card.querySelector('.edit-btn');
            editBtn.onclick = (e) => {
                e.stopPropagation();
                openThoughtModal(thought.id);
            };

            grid.appendChild(card);
        });

        if (editMode) {
            const addBtn = document.createElement('div');
            addBtn.className = 'add-card-btn';
            addBtn.innerHTML = '<i class="fas fa-plus"></i> 添加随笔';
            addBtn.onclick = () => openThoughtModal(null);
            grid.appendChild(addBtn);
        }
    }

    function renderTools(filter = 'all') {
        const grid = document.getElementById('toolGrid');
        grid.innerHTML = '';

        const filtered = filter === 'all'
            ? data.tools
            : data.tools.filter(t => t.cat === filter);

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <i class="fas fa-inbox"></i>
                    <p>这个分类下还没有工具，编辑模式下可以添加～</p>
                </div>
            `;
            return;
        }

        filtered.forEach((tool, idx) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animationDelay = `${idx * 0.05}s`;

            const catColorMap = {
                'ai': 'purple',
                'design': 'gold',
                'learning': 'blue',
                'maker': 'brown'
            };

            card.innerHTML = `
                <button class="edit-btn" title="编辑" data-action="edit-tool" data-id="${tool.id}">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <div class="card-header">
                    <div class="card-icon ${catColorMap[tool.cat] || 'green'}">
                        <i class="${tool.icon || 'fas fa-wrench'}"></i>
                    </div>
                    <div>
                        <div class="card-title">${tool.name}</div>
                        <div class="card-subtitle">${getCatName(tool.cat)}</div>
                    </div>
                </div>
                <div class="card-body">${tool.desc}</div>
                <div class="card-links">
                    <a href="${tool.link}" class="card-link" target="_blank" rel="noopener">
                        <i class="fas fa-external-link-alt"></i> 访问官网
                    </a>
                </div>
            `;

            const editBtn = card.querySelector('.edit-btn');
            editBtn.onclick = (e) => {
                e.stopPropagation();
                openToolModal(tool.id);
            };

            grid.appendChild(card);
        });

        if (editMode) {
            const addBtn = document.createElement('div');
            addBtn.className = 'add-card-btn';
            addBtn.innerHTML = '<i class="fas fa-plus"></i> 添加工具';
            addBtn.onclick = () => openToolModal(null);
            grid.appendChild(addBtn);
        }
    }

    function getCatName(cat) {
        const map = { 'ai': 'AI 编程', 'design': '设计素材', 'learning': '学习效率', 'maker': '创客硬件' };
        return map[cat] || '其他';
    }

    function renderMessages() {
        const list = document.getElementById('messageList');
        list.innerHTML = '';

        if (data.messages.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-comment-slash"></i>
                    <p>还没有留言，做第一个留言的人吧～</p>
                </div>
            `;
            return;
        }

        data.messages.forEach(msg => {
            const item = document.createElement('div');
            item.className = 'message-item';
            item.innerHTML = `
                <div class="message-avatar">${msg.avatar || '🧑'}</div>
                <div class="message-content">
                    <div class="message-text">${msg.text}</div>
                    <div class="message-time">${msg.time}</div>
                </div>
                <button class="message-delete" title="删除" data-id="${msg.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            const delBtn = item.querySelector('.message-delete');
            delBtn.onclick = () => {
                if (confirm('确定删除这条留言吗？')) {
                    data.messages = data.messages.filter(m => m.id !== msg.id);
                    saveData();
                    renderMessages();
                    showToast('留言已删除');
                }
            };

            list.appendChild(item);
        });
    }

    // ======================== 编辑模式 ========================
    function toggleEditMode() {
        editMode = !editMode;
        const body = document.body;
        const btn = document.getElementById('editModeBtn');

        if (editMode) {
            body.classList.add('edit-mode');
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-times"></i> 退出编辑';
            showToast('编辑模式已开启 — 点击橙色虚线区域直接编辑文字');
        } else {
            body.classList.remove('edit-mode');
            btn.classList.remove('active');
            btn.innerHTML = '<i class="fas fa-pencil-alt"></i> 编辑模式';
            // 清除所有 editing 状态
            document.querySelectorAll('.editing').forEach(el => el.classList.remove('editing'));
            showToast('编辑模式已关闭 — 所有修改已自动保存');
        }

        // 重新渲染以显示/隐藏编辑按钮和添加按钮
        renderProjects();
        renderThoughts();
        renderTools(currentToolFilter);
    }

    // 可编辑文本处理
    function initEditableText() {
        document.addEventListener('click', (e) => {
            if (!editMode) return;

            const editable = e.target.closest('[data-editable]');
            if (!editable) return;
            if (editable.classList.contains('editing')) return;

            startEditing(editable);
        });
    }

    function startEditing(el) {
        el.classList.add('editing');
        const original = el.textContent;
        const field = el.dataset.editable;

        // 用 textarea 替换多行文本
        if (original.length > 60 || field === 'welcome') {
            const ta = document.createElement('textarea');
            ta.value = original;
            ta.style.cssText = `
                width: 100%; min-height: 80px; padding: 8px 12px;
                border: 2px solid var(--stardew-red); border-radius: 6px;
                font-size: inherit; font-family: inherit; line-height: 1.7;
                background: white; color: var(--stardew-charcoal);
                resize: vertical; z-index: 100; position: relative;
            `;
            el.replaceWith(ta);
            ta.focus();
            ta.setSelectionRange(ta.value.length, ta.value.length);

            const finish = () => {
                const newVal = ta.value.trim() || original;
                el.textContent = newVal;
                ta.replaceWith(el);
                el.classList.remove('editing');
                saveEditableField(field, newVal);
            };

            ta.addEventListener('blur', finish);
            ta.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); finish(); }
                if (e.key === 'Escape') { ta.value = original; finish(); }
            });
        } else {
            // 单行用 input
            const input = document.createElement('input');
            input.type = 'text';
            input.value = original;
            input.style.cssText = `
                width: 100%; padding: 4px 8px;
                border: 2px solid var(--stardew-red); border-radius: 4px;
                font-size: inherit; font-family: inherit; font-weight: inherit;
                background: white; color: var(--stardew-charcoal);
                z-index: 100; position: relative;
            `;
            el.replaceWith(input);
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);

            const finish = () => {
                const newVal = input.value.trim() || original;
                el.textContent = newVal;
                input.replaceWith(el);
                el.classList.remove('editing');
                saveEditableField(field, newVal);
            };

            input.addEventListener('blur', finish);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') { e.preventDefault(); finish(); }
                if (e.key === 'Escape') { input.value = original; finish(); }
            });
        }
    }

    function saveEditableField(field, value) {
        switch (field) {
            case 'name': data.profile.name = value; break;
            case 'subtitle': data.profile.subtitle = value; break;
            case 'intent': data.profile.intent = value; break;
            case 'welcome': data.profile.welcome = value; break;
            case 'email': data.contact.email = value; break;
            case 'github': data.contact.github = value; break;
            case 'huggingface': data.contact.huggingface = value; break;
            case 'wechat': data.contact.wechat = value; break;
        }
        saveData();
        renderProfile();
        showToast('✅ 已保存');
    }

    // ======================== 模态框（项目/随笔/工具编辑）========================
    let currentToolFilter = 'all';

    function openProjectModal(projectId) {
        const proj = projectId ? data.projects.find(p => p.id === projectId) : null;
        const isEdit = !!proj;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay show';
        overlay.innerHTML = `
            <div class="modal">
                <h3><i class="fas fa-seedling"></i> ${isEdit ? '编辑项目' : '添加项目'}</h3>
                <div class="modal-form">
                    <label>项目名称</label>
                    <input type="text" id="mf-title" value="${isEdit ? proj.title : ''}" placeholder="如：Laser Agent Pro">
                    
                    <label>副标题</label>
                    <input type="text" id="mf-subtitle" value="${isEdit ? proj.subtitle : ''}" placeholder="如：AI 激光参数推荐系统">
                    
                    <label>图标 Class（Font Awesome）</label>
                    <input type="text" id="mf-icon" value="${isEdit ? proj.icon : 'fas fa-star'}" placeholder="如：fas fa-robot">
                    
                    <label>图标颜色</label>
                    <select id="mf-color">
                        ${['green','blue','purple','orange','red','brown','gold'].map(c =>
            `<option value="${c}" ${isEdit && proj.iconColor === c ? 'selected' : ''}>${c}</option>`
        ).join('')}
                    </select>
                    
                    <label>描述内容</label>
                    <textarea id="mf-body" placeholder="详细描述这个项目...">${isEdit ? proj.body : ''}</textarea>
                    
                    <label>标签（逗号分隔）</label>
                    <input type="text" id="mf-tags" value="${isEdit ? proj.tags.join(', ') : ''}" placeholder="FastAPI, Gradio, 贝叶斯推理">
                    
                    <label>链接（每行一个，格式：文本|URL|primary/secondary）</label>
                    <textarea id="mf-links" placeholder="GitHub|https://github.com/|primary">${isEdit && proj.links ? proj.links.map(l => `${l.text}|${l.url}|${l.type}`).join('\n') : ''}</textarea>
                    
                    <div class="modal-actions">
                        ${isEdit ? `<button class="btn-cancel" id="btn-delete" style="margin-right:auto;background:var(--stardew-red);border-color:var(--stardew-red);">🗑️ 删除</button>` : ''}
                        <button class="btn-cancel" id="btn-cancel">取消</button>
                        <button class="pixel-btn" id="btn-save">💾 保存</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const close = () => overlay.remove();
        overlay.querySelector('#btn-cancel').onclick = close;
        overlay.onclick = (e) => { if (e.target === overlay) close(); };

        // 删除
        const delBtn = overlay.querySelector('#btn-delete');
        if (delBtn) {
            delBtn.onclick = () => {
                if (confirm('确定删除这个项目吗？')) {
                    data.projects = data.projects.filter(p => p.id !== projectId);
                    saveData();
                    renderProjects();
                    renderProfile();
                    close();
                    showToast('项目已删除');
                }
            };
        }

        // 保存
        overlay.querySelector('#btn-save').onclick = () => {
            const title = overlay.querySelector('#mf-title').value.trim();
            if (!title) { showToast('请填写项目名称'); return; }

            const tags = overlay.querySelector('#mf-tags').value.split(',').map(s => s.trim()).filter(Boolean);
            const linksText = overlay.querySelector('#mf-links').value.trim();
            const links = linksText ? linksText.split('\n').map(line => {
                const parts = line.split('|');
                return { text: parts[0]?.trim() || '', url: parts[1]?.trim() || '#', type: parts[2]?.trim() || 'primary' };
            }) : [];

            const newProj = {
                id: isEdit ? proj.id : 'p' + Date.now(),
                icon: overlay.querySelector('#mf-icon').value.trim() || 'fas fa-star',
                iconColor: overlay.querySelector('#mf-color').value,
                title,
                subtitle: overlay.querySelector('#mf-subtitle').value.trim(),
                body: overlay.querySelector('#mf-body').value.trim(),
                tags,
                links
            };

            if (isEdit) {
                const idx = data.projects.findIndex(p => p.id === projectId);
                data.projects[idx] = newProj;
            } else {
                data.projects.push(newProj);
            }

            saveData();
            renderProjects();
            renderProfile();
            close();
            showToast(isEdit ? '项目已更新' : '项目已添加');
        };
    }

    function openThoughtModal(thoughtId) {
        const thought = thoughtId ? data.thoughts.find(t => t.id === thoughtId) : null;
        const isEdit = !!thought;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay show';
        overlay.innerHTML = `
            <div class="modal">
                <h3><i class="fas fa-book-open"></i> ${isEdit ? '编辑随笔' : '添加随笔'}</h3>
                <div class="modal-form">
                    <label>标题</label>
                    <input type="text" id="tf-title" value="${isEdit ? thought.title : ''}" placeholder="如：安全不是功能，是信任">
                    
                    <label>副标题</label>
                    <input type="text" id="tf-subtitle" value="${isEdit ? thought.subtitle : ''}" placeholder="如：工程伦理随笔">
                    
                    <label>图标 Class</label>
                    <input type="text" id="tf-icon" value="${isEdit ? thought.icon : 'fas fa-star'}" placeholder="fas fa-shield-alt">
                    
                    <label>图标颜色</label>
                    <select id="tf-color">
                        ${['green','blue','purple','orange','red','brown','gold'].map(c =>
            `<option value="${c}" ${isEdit && thought.iconColor === c ? 'selected' : ''}>${c}</option>`
        ).join('')}
                    </select>
                    
                    <label>正文内容</label>
                    <textarea id="tf-body" style="min-height:100px;" placeholder="写下你的感悟...">${isEdit ? thought.body : ''}</textarea>
                    
                    <label>标签（逗号分隔）</label>
                    <input type="text" id="tf-tags" value="${isEdit ? thought.tags.join(', ') : ''}" placeholder="AI安全, 工程伦理">
                    
                    <div class="modal-actions">
                        ${isEdit ? `<button class="btn-cancel" id="btn-delete" style="margin-right:auto;background:var(--stardew-red);border-color:var(--stardew-red);">🗑️ 删除</button>` : ''}
                        <button class="btn-cancel" id="btn-cancel">取消</button>
                        <button class="pixel-btn" id="btn-save">💾 保存</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const close = () => overlay.remove();
        overlay.querySelector('#btn-cancel').onclick = close;
        overlay.onclick = (e) => { if (e.target === overlay) close(); };

        const delBtn = overlay.querySelector('#btn-delete');
        if (delBtn) {
            delBtn.onclick = () => {
                if (confirm('确定删除这篇随笔吗？')) {
                    data.thoughts = data.thoughts.filter(t => t.id !== thoughtId);
                    saveData();
                    renderThoughts();
                    renderProfile();
                    close();
                    showToast('随笔已删除');
                }
            };
        }

        overlay.querySelector('#btn-save').onclick = () => {
            const title = overlay.querySelector('#tf-title').value.trim();
            if (!title) { showToast('请填写标题'); return; }

            const tags = overlay.querySelector('#tf-tags').value.split(',').map(s => s.trim()).filter(Boolean);

            const newThought = {
                id: isEdit ? thought.id : 't' + Date.now(),
                icon: overlay.querySelector('#tf-icon').value.trim() || 'fas fa-star',
                iconColor: overlay.querySelector('#tf-color').value,
                title,
                subtitle: overlay.querySelector('#tf-subtitle').value.trim(),
                body: overlay.querySelector('#tf-body').value.trim(),
                tags
            };

            if (isEdit) {
                const idx = data.thoughts.findIndex(t => t.id === thoughtId);
                data.thoughts[idx] = newThought;
            } else {
                data.thoughts.push(newThought);
            }

            saveData();
            renderThoughts();
            renderProfile();
            close();
            showToast(isEdit ? '随笔已更新' : '随笔已添加');
        };
    }

    function openToolModal(toolId) {
        const tool = toolId ? data.tools.find(t => t.id === toolId) : null;
        const isEdit = !!tool;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay show';
        overlay.innerHTML = `
            <div class="modal">
                <h3><i class="fas fa-toolbox"></i> ${isEdit ? '编辑工具' : '添加工具'}</h3>
                <div class="modal-form">
                    <label>工具名称</label>
                    <input type="text" id="tl-name" value="${isEdit ? tool.name : ''}" placeholder="如：Cursor">
                    
                    <label>描述</label>
                    <input type="text" id="tl-desc" value="${isEdit ? tool.desc : ''}" placeholder="如：AI 原生代码编辑器">
                    
                    <label>分类</label>
                    <select id="tl-cat">
                        <option value="ai" ${isEdit && tool.cat === 'ai' ? 'selected' : ''}>AI 编程</option>
                        <option value="design" ${isEdit && tool.cat === 'design' ? 'selected' : ''}>设计素材</option>
                        <option value="learning" ${isEdit && tool.cat === 'learning' ? 'selected' : ''}>学习效率</option>
                        <option value="maker" ${isEdit && tool.cat === 'maker' ? 'selected' : ''}>创客硬件</option>
                    </select>
                    
                    <label>图标 Class</label>
                    <input type="text" id="tl-icon" value="${isEdit ? tool.icon : 'fas fa-wrench'}" placeholder="fas fa-code">
                    
                    <label>官网链接</label>
                    <input type="text" id="tl-link" value="${isEdit ? tool.link : 'https://'}" placeholder="https://example.com">
                    
                    <div class="modal-actions">
                        ${isEdit ? `<button class="btn-cancel" id="btn-delete" style="margin-right:auto;background:var(--stardew-red);border-color:var(--stardew-red);">🗑️ 删除</button>` : ''}
                        <button class="btn-cancel" id="btn-cancel">取消</button>
                        <button class="pixel-btn" id="btn-save">💾 保存</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const close = () => overlay.remove();
        overlay.querySelector('#btn-cancel').onclick = close;
        overlay.onclick = (e) => { if (e.target === overlay) close(); };

        const delBtn = overlay.querySelector('#btn-delete');
        if (delBtn) {
            delBtn.onclick = () => {
                if (confirm('确定删除这个工具吗？')) {
                    data.tools = data.tools.filter(t => t.id !== toolId);
                    saveData();
                    renderTools(currentToolFilter);
                    renderProfile();
                    close();
                    showToast('工具已删除');
                }
            };
        }

        overlay.querySelector('#btn-save').onclick = () => {
            const name = overlay.querySelector('#tl-name').value.trim();
            if (!name) { showToast('请填写工具名称'); return; }

            const newTool = {
                id: isEdit ? tool.id : 'tl' + Date.now(),
                name,
                desc: overlay.querySelector('#tl-desc').value.trim(),
                cat: overlay.querySelector('#tl-cat').value,
                icon: overlay.querySelector('#tl-icon').value.trim() || 'fas fa-wrench',
                link: overlay.querySelector('#tl-link').value.trim() || '#'
            };

            if (isEdit) {
                const idx = data.tools.findIndex(t => t.id === toolId);
                data.tools[idx] = newTool;
            } else {
                data.tools.push(newTool);
            }

            saveData();
            renderTools(currentToolFilter);
            renderProfile();
            close();
            showToast(isEdit ? '工具已更新' : '工具已添加');
        };
    }

    // ======================== 导航切换 ========================
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.dataset.section;

                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                sections.forEach(s => {
                    s.classList.remove('active');
                    if (s.id === target) {
                        s.classList.add('active');
                        // 重新触发动画
                        s.style.animation = 'none';
                        s.offsetHeight; // reflow
                        s.style.animation = '';
                    }
                });
            });
        });

        // 滚动联动导航高亮
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(l => {
                        l.classList.toggle('active', l.dataset.section === id);
                    });
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(s => observer.observe(s));
    }

    // ======================== 工具分类筛选 ========================
    function initToolCategories() {
        const btns = document.querySelectorAll('.cat-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentToolFilter = btn.dataset.cat;
                renderTools(currentToolFilter);
            });
        });
    }

    // ======================== 留言板 ========================
    function initMessageBoard() {
        const btn = document.getElementById('sendMessageBtn');
        const input = document.getElementById('messageInput');

        const send = () => {
            const text = input.value.trim();
            if (!text) { showToast('请输入留言内容'); return; }

            const avatars = ['🌻', '🦊', '🐱', '🐰', '🐻', '🦔', '🐢', '🐝', '🦋', '🌸'];
            const avatar = avatars[Math.floor(Math.random() * avatars.length)];
            const now = new Date();
            const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

            data.messages.push({
                id: 'm' + Date.now(),
                text,
                avatar,
                time: timeStr
            });
            saveData();
            renderMessages();
            input.value = '';
            showToast('留言已发送 🌱');
        };

        btn.addEventListener('click', send);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); send(); }
        });
    }

    // ======================== Toast 提示 ========================
    function showToast(text) {
        const toast = document.getElementById('editToast');
        const toastText = document.getElementById('toastText');
        toastText.textContent = text;
        toast.classList.add('show');
        clearTimeout(showToast._timer);
        showToast._timer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // ======================== Konami Code 彩蛋 ========================
    function initKonamiCode() {
        const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let input = [];
        let activated = false;

        document.addEventListener('keydown', (e) => {
            input.push(e.key);
            if (input.length > sequence.length) input.shift();

            if (input.join(',') === sequence.join(',')) {
                if (!activated) {
                    activated = true;
                    document.body.classList.add('rainbow-mode');
                    const hint = document.getElementById('konamiHint');
                    hint.classList.add('show');
                    setTimeout(() => {
                        hint.classList.remove('show');
                        document.body.classList.remove('rainbow-mode');
                        activated = false;
                    }, 5000);
                }
            }
        });
    }

    // ======================== 初始化 ========================
    function init() {
        // 渲染所有内容
        renderProfile();
        renderProjects();
        renderThoughts();
        renderTools('all');
        renderMessages();

        // 访客计数
        initVisitorCounter();

        // 导航
        initNavigation();

        // 工具分类
        initToolCategories();

        // 留言板
        initMessageBoard();

        // 编辑模式按钮
        document.getElementById('editModeBtn').addEventListener('click', toggleEditMode);

        // 可编辑文本
        initEditableText();

        // Konami Code
        initKonamiCode();

        console.log('%c🌾 欢迎来到星露谷个人主页！', 'font-size:20px;color:#4CAF50;font-weight:bold;');
        console.log('%c💡 提示：按 ↑↑↓↓←→←→BA 触发彩虹彩蛋', 'color:#FF9800;');
    }

    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
