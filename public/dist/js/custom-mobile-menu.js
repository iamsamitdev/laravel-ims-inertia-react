// JavaScript สำหรับการทำงานของเมนูบน mobile
document.addEventListener('DOMContentLoaded', function() {
    // ปุ่มสำหรับเปิด/ปิด เมนูบน mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (navbarToggler && navbarMenu) {
        // เมื่อคลิกที่ปุ่มแฮมเบอร์เกอร์
        navbarToggler.addEventListener('click', function() {
            // เปิด/ปิด class
            navbarMenu.classList.toggle('show');
            navbarToggler.classList.toggle('active');
        });
        
        // ปิดเมนูเมื่อคลิกที่ลิงก์ใน mobile
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // ตรวจสอบหากหน้าจอเป็น mobile
                if (window.innerWidth < 768) {
                    navbarMenu.classList.remove('show');
                    navbarToggler.classList.remove('active');
                }
            });
        });
        
        // ปิดเมนูเมื่อคลิกที่ mobile-quick-item
        const quickItems = document.querySelectorAll('.mobile-quick-item');
        quickItems.forEach(function(item) {
            item.addEventListener('click', function() {
                navbarMenu.classList.remove('show');
                navbarToggler.classList.remove('active');
            });
        });
    }
    
    // ทำงานกับ dropdown เมนูบน mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            // ตรวจสอบหากหน้าจอเป็น mobile
            if (window.innerWidth < 768) {
                // ป้องกันการเปลี่ยนหน้า
                e.preventDefault();
                
                // หา dropdown-menu ที่เกี่ยวข้อง
                const dropdownMenu = this.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    // เปิด/ปิด dropdown-menu
                    dropdownMenu.classList.toggle('show');
                    this.classList.toggle('active');
                }
            }
        });
    });
}); 