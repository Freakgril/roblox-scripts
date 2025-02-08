document.addEventListener("DOMContentLoaded", function () {
    const scriptsPerPage = 12;
    let currentPage = 1;
    let scripts = [];

    async function fetchScripts() {
        scripts = [
            "script1.lua", "script2.lua", "script3.lua", "script4.lua",
            "script5.lua", "script6.lua", "script7.lua", "script8.lua",
            "script9.lua", "script10.lua", "script11.lua", "script12.lua"
        ]; // Add your real script filenames here
        displayScripts();
    }

    function displayScripts() {
        const scriptList = document.getElementById("scriptList");
        scriptList.innerHTML = "";
        
        const start = (currentPage - 1) * scriptsPerPage;
        const end = start + scriptsPerPage;
        const paginatedScripts = scripts.slice(start, end);

        paginatedScripts.forEach(script => {
            const scriptCard = document.createElement("div");
            scriptCard.className = "script-card";
            scriptCard.innerHTML = `
                <h3>${script}</h3>
                <button class="copy-button" onclick="copyScript('${script}')">Copy Script</button>
            `;
            scriptList.appendChild(scriptCard);
        });

        updatePagination();
    }

    function updatePagination() {
        const pagination = document.getElementById("pagination");
        pagination.innerHTML = "";

        const totalPages = Math.ceil(scripts.length / scriptsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.classList.add("page-button");
            if (i === currentPage) button.classList.add("active");
            button.onclick = function () {
                currentPage = i;
                displayScripts();
            };
            pagination.appendChild(button);
        }
    }

    function copyScript(filename) {
        const scriptPath = `scripts/${filename}`;
        navigator.clipboard.writeText(`loadstring(game:HttpGet("https://yourwebsite.com/${scriptPath}"))()`);
        alert(`Copied script: ${filename}`);
    }

    document.getElementById("searchBar").addEventListener("input", function () {
        const query = this.value.toLowerCase();
        scripts = scripts.filter(script => script.toLowerCase().includes(query));
        currentPage = 1;
        displayScripts();
    });

    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    fetchScripts();
});
