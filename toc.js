// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="ER/er.html"><strong aria-hidden="true">1.</strong> ER 図</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ER/tables/users.html"><strong aria-hidden="true">1.1.</strong> スタッフ</a></li><li class="chapter-item expanded "><a href="ER/tables/schedules.html"><strong aria-hidden="true">1.2.</strong> 予定</a></li><li class="chapter-item expanded "><a href="ER/tables/visit_infos.html"><strong aria-hidden="true">1.3.</strong> 訪問情報</a></li><li class="chapter-item expanded "><a href="ER/tables/patients.html"><strong aria-hidden="true">1.4.</strong> 患者</a></li><li class="chapter-item expanded "><a href="ER/tables/policies.html"><strong aria-hidden="true">1.5.</strong> 権限</a></li><li class="chapter-item expanded "><a href="ER/tables/facilities.html"><strong aria-hidden="true">1.6.</strong> 施設</a></li><li class="chapter-item expanded "><a href="ER/tables/addresses.html"><strong aria-hidden="true">1.7.</strong> 住所・エリア</a></li><li class="chapter-item expanded "><a href="ER/tables/labor_managements.html"><strong aria-hidden="true">1.8.</strong> 経営情報</a></li></ol></li><li class="chapter-item expanded "><a href="インフラ構成/インフラ構成.html"><strong aria-hidden="true">2.</strong> インフラ構成</a></li><li class="chapter-item expanded "><a href="機能詳細/Summary.html"><strong aria-hidden="true">3.</strong> 機能一覧</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="機能詳細/認証認可・ユーザー管理/Summary.html"><strong aria-hidden="true">3.1.</strong> 認証認可・ユーザー管理</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="機能詳細/認証認可・ユーザー管理/認証認可.html"><strong aria-hidden="true">3.1.1.</strong> 認証認可</a></li><li class="chapter-item expanded "><a href="機能詳細/認証認可・ユーザー管理/新規ユーザー登録.html"><strong aria-hidden="true">3.1.2.</strong> 新期ユーザー登録</a></li><li class="chapter-item expanded "><a href="機能詳細/認証認可・ユーザー管理/権限.html"><strong aria-hidden="true">3.1.3.</strong> 権限制御</a></li><li class="chapter-item expanded "><a href="機能詳細/認証認可・ユーザー管理/ユーザー管理.html"><strong aria-hidden="true">3.1.4.</strong> ユーザー管理</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.</strong> 施設</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="機能詳細/施設/施設情報.html"><strong aria-hidden="true">3.2.1.</strong> 施設情報</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.3.</strong> 経営数値</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="機能詳細/経営数値/管理する経営数値.html"><strong aria-hidden="true">3.3.1.</strong> 管理する経営数値</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="画面構成/画面一覧.html"><strong aria-hidden="true">4.</strong> 画面構成（一覧）</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="画面構成/予定/カレンダー.html"><strong aria-hidden="true">4.1.</strong> カレンダー</a></li><li class="chapter-item expanded "><a href="画面構成/予定/予定詳細.html"><strong aria-hidden="true">4.2.</strong> 予定詳細</a></li><li class="chapter-item expanded "><a href="画面構成/患者/患者一覧.html"><strong aria-hidden="true">4.3.</strong> 患者一覧</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
