document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const scientistNameInput = document.getElementById('scientistName');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const resultsContainer = document.getElementById('resultsContainer');
    const publicationsList = document.getElementById('publicationsList');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsCount = document.getElementById('resultsCount');
    const errorText = document.getElementById('errorText');

    // 点击搜索按钮触发搜索
    searchButton.addEventListener('click', performSearch);

    // 按回车键触发搜索
    scientistNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const name = scientistNameInput.value.trim();

        if (!name) {
            showError('请输入科学家姓名');
            return;
        }

        // 显示加载指示器，隐藏其他内容
        loadingIndicator.style.display = 'block';
        errorMessage.style.display = 'none';
        resultsContainer.style.display = 'none';

        // 发送搜索请求到后端
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name })
        })
        .then(response => response.json())
        .then(data => {
            loadingIndicator.style.display = 'none';

            if (data.success) {
                displayResults(data.name, data.publications, data.websites, data.years);
            } else {
                showError(data.message || '搜索失败，请重试');
            }
        })
        .catch(error => {
            loadingIndicator.style.display = 'none';
            showError('网络错误，请检查连接后重试');
            console.error('Error:', error);
        });
    }

    function displayResults(name, publications, websites, years) {
        // 更新标题和计数
        resultsTitle.textContent = `${name}的学术文献`;
        resultsCount.textContent = `${publications.length} 篇文献`;

        // 清空之前的列表
        publicationsList.innerHTML = '';

        // 添加新的文献条目
        publications.forEach((pub, index) => {
            const pubElement = document.createElement('li');
            pubElement.className = 'publication-item';

            // 创建标题容器
            const titleContainer = document.createElement('div');
            titleContainer.className = 'publication-title-container';

            // 创建链接
            const pubLink = document.createElement('a');
            pubLink.className = 'publication-title';
            pubLink.href = websites[index] || '#';
            pubLink.target = '_blank';
            pubLink.textContent = pub;

            // 创建年份标签
            if (years && years[index]) {
                const yearSpan = document.createElement('span');
                yearSpan.className = 'publication-year';
                yearSpan.textContent = years[index];
                titleContainer.appendChild(yearSpan);
            }

            // 创建详情区域
            const detailsElement = document.createElement('div');
            detailsElement.className = 'publication-details';

            // 添加类型（模拟数据）
            const typeElement = document.createElement('div');
            typeElement.className = 'publication-detail';
            typeElement.innerHTML = '<i class="far fa-file-alt"></i> 期刊论文';

            // 组装元素
            titleContainer.insertBefore(pubLink, titleContainer.firstChild);

            detailsElement.appendChild(typeElement);

            pubElement.appendChild(titleContainer);
            pubElement.appendChild(detailsElement);

            publicationsList.appendChild(pubElement);
        });

        // 显示结果容器
        resultsContainer.style.display = 'block';
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.style.display = 'block';
    }
});