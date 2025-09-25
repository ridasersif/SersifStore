
        // Cart functionality
        let cart = [];
        let cartTotal = 0;

        function addToCart(name, price) {
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            
            updateCart();
            showCartNotification(name);
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }

        function updateQuantity(index, change) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                removeFromCart(index);
            } else {
                updateCart();
            }
        }

        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const cartFooter = document.getElementById('cartFooter');
            const cartCount = document.getElementById('cartCount');
            const floatingCartCount = document.getElementById('floatingCartCount');
            const cartTotal = document.getElementById('cartTotal');
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="text-center text-muted">
                        <i class="fas fa-shopping-cart fa-3x mb-3"></i>
                        <p>Votre panier est vide</p>
                    </div>
                `;
                cartFooter.style.display = 'none';
                cartCount.textContent = '0';
                floatingCartCount.textContent = '0';
            } else {
                let itemsHTML = '';
                let total = 0;
                let totalItems = 0;
                
                cart.forEach((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    totalItems += item.quantity;
                    
                    itemsHTML += `
                        <div class="cart-item mb-3 p-3 border rounded">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="mb-1">${item.name}</h6>
                                    <small class="text-muted">${item.price} DH x ${item.quantity}</small>
                                </div>
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                                    <span class="mx-2">${item.quantity}</span>
                                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${index})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="text-end mt-2">
                                <strong>${itemTotal} DH</strong>
                            </div>
                        </div>
                    `;
                });
                
                cartItems.innerHTML = itemsHTML;
                cartFooter.style.display = 'block';
                cartTotal.textContent = total + ' DH';
                cartCount.textContent = totalItems;
                floatingCartCount.textContent = totalItems;
            }
        }

        function toggleCart() {
            const cartSidebar = document.querySelector('.cart-sidebar');
            const cartOverlay = document.querySelector('.cart-overlay');
            
            cartSidebar.classList.toggle('show');
            cartOverlay.classList.toggle('show');
        }

        function clearCart() {
            cart = [];
            updateCart();
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Votre panier est vide!');
                return;
            }
            
            alert('Redirection vers la page de paiement...');
            // Here you would redirect to checkout page
        }

        function showCartNotification(productName) {
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'alert alert-success position-fixed';
            notification.style.cssText = `
                top: 100px;
                right: 20px;
                z-index: 1060;
                min-width: 300px;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `;
            notification.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                "${productName}" ajouté au panier!
            `;
            
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Hide notification
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Filter products
        function filterProducts(category) {
            const products = document.querySelectorAll('.product-item');
            const filterBtns = document.querySelectorAll('.filter-btn');
            
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            // Filter products
            products.forEach(product => {
                if (category === 'all' || product.classList.contains(category)) {
                    product.style.display = 'block';
                    setTimeout(() => {
                        product.style.opacity = '1';
                        product.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    product.style.opacity = '0';
                    product.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        product.style.display = 'none';
                    }, 300);
                }
            });
        }

        // Newsletter subscription
        function subscribeNewsletter() {
            const email = document.querySelector('.newsletter-input').value;
            if (email && email.includes('@')) {
                alert('Merci pour votre inscription à notre newsletter!');
                document.querySelector('.newsletter-input').value = '';
            } else {
                alert('Veuillez entrer une adresse email valide.');
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Close cart when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.cart-sidebar') && !e.target.closest('[onclick="toggleCart()"]')) {
                const cartSidebar = document.querySelector('.cart-sidebar');
                const cartOverlay = document.querySelector('.cart-overlay');
                if (cartSidebar.classList.contains('show')) {
                    cartSidebar.classList.remove('show');
                    cartOverlay.classList.remove('show');
                }
            }
        });

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    