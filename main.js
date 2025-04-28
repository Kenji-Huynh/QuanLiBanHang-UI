// Counter animation for Stats Section - Modified for continuous counting effect
function startCountAnimation() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((element) => {
    const max = parseInt(element.getAttribute("data-count"));
    const min =
      parseInt(element.getAttribute("data-min")) || Math.floor(max * 0.9); // Nếu không có data-min, lấy 90% giá trị tối đa
    let current = min;
    element.textContent = current;

    // Tạo hiệu ứng tăng dần liên tục
    function updateCounter() {
      // Tính toán số lượng tăng mỗi lần
      let increment;
      const range = max - min;

      if (max > 1000) {
        increment = Math.ceil(range / 50); // Tăng nhanh hơn với số lớn
      } else if (max > 100) {
        increment = Math.ceil(range / 30);
      } else {
        increment = 1;
      }

      // Tăng số lên
      current += increment;

      // Nếu đạt tới giá trị tối đa, reset về giá trị tối thiểu
      if (current >= max) {
        current = min;
      }

      // Cập nhật hiển thị
      element.textContent = current;

      // Thiết lập độ trễ ngẫu nhiên để tạo cảm giác tự nhiên
      const delay = Math.random() * 200 + 100;
      setTimeout(updateCounter, delay);
    }

    // Bắt đầu cập nhật counter với độ trễ ngẫu nhiên
    const initialDelay = Math.random() * 500;
    setTimeout(updateCounter, initialDelay);
  });
}

// Khởi động animation khi trang tải xong
document.addEventListener("DOMContentLoaded", function () {
  console.log("Document loaded and ready");

  // Hero section animations
  const heroTitle = document.querySelector(".hero-title");
  const heroDescription = document.querySelector(".hero-description");
  const heroCta = document.querySelector(".hero-cta");

  // Simple fade-in animation
  setTimeout(() => {
    if (heroTitle) heroTitle.style.opacity = "1";
  }, 300);

  setTimeout(() => {
    if (heroDescription) heroDescription.style.opacity = "1";
  }, 600);

  setTimeout(() => {
    if (heroCta) heroCta.style.opacity = "1";
  }, 900);

  // Improved feature card hover effects
  const featureCards = document.querySelectorAll(".feature-card");

  // Đặt z-index ban đầu dựa trên thứ tự hiển thị
  featureCards.forEach((card, index) => {
    // Feature đầu tiên nằm dưới
    card.style.zIndex = featureCards.length - index;
  });

  featureCards.forEach((card, index) => {
    // Lưu trạng thái hover để tránh trigger nhiều lần
    let isHovered = false;

    card.addEventListener("mouseenter", () => {
      if (isHovered) return;
      isHovered = true;

      // Đưa card hiện tại lên trên cùng và đẩy z-index cao hơn nhiều
      card.style.zIndex = 100;

      // Thêm class để xử lý hiệu ứng CSS
      card.classList.add("hovered");

      // Đảm bảo các card khác có z-index thấp hơn
      featureCards.forEach((otherCard, otherIndex) => {
        if (otherIndex !== index) {
          otherCard.style.zIndex = featureCards.length - otherIndex;
          // Đảm bảo không có card nào khác đang được hover
          otherCard.classList.remove("hovered");
        }
      });
    });

    card.addEventListener("mouseleave", () => {
      // Đặt lại trạng thái
      isHovered = false;

      // Xóa class hover
      card.classList.remove("hovered");

      // Delay việc thay đổi z-index để hoàn thành transition mượt mà
      setTimeout(() => {
        // Chỉ reset z-index nếu không còn hover
        if (!isHovered) {
          card.style.zIndex = featureCards.length - index;
        }
      }, 600); // Thời gian chờ phải tương đương hoặc lớn hơn thời gian transition
    });
  });

  // Auto hover cho feature thứ 2 (index 1) sau khi trang tải xong
  setTimeout(() => {
    if (featureCards.length > 1) {
      const secondFeature = featureCards[1]; // Lấy feature thứ 2 (index 1)

      // Kích hoạt hiệu ứng hover
      secondFeature.style.zIndex = 100;
      secondFeature.classList.add("hovered");

      // Đánh dấu là đã hover (nếu sử dụng biến isHovered)
      if (secondFeature._hoverHandler) {
        secondFeature._isHovered = true;
      }

      // Đảm bảo các card khác có z-index thấp hơn
      featureCards.forEach((otherCard, otherIndex) => {
        if (otherIndex !== 1) {
          otherCard.style.zIndex = featureCards.length - otherIndex;
        }
      });
    }
  }, 1200); // Chờ sau hero animation một chút

  // Hiệu ứng hover cho các card nhỏ trong feature 3
  const smallCards = document.querySelectorAll(".feature-small-card");

  smallCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Các hiệu ứng đã được xử lý bằng CSS
    });
  });

  // Reset auto hover cho feature 2 sau một thời gian
  setTimeout(() => {
    const secondFeature = document.querySelector(".feature-social");
    if (secondFeature && secondFeature.classList.contains("hovered")) {
      secondFeature.classList.remove("hovered");

      // Reset z-index về ban đầu
      setTimeout(() => {
        featureCards.forEach((card, index) => {
          card.style.zIndex = featureCards.length - index;
        });
      }, 600);
    }
  }, 5000); // Auto hover feature 2 trong 5 giây rồi trả về trạng thái bình thường

  // Hiệu ứng hover cho portfolio items
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const defaultImage = this.querySelector(".default-image");
      const hoverImage = this.querySelector(".hover-image");

      defaultImage.style.transition = "opacity 0.5s ease";
      hoverImage.style.transition = "opacity 0.5s ease";

      defaultImage.style.opacity = "0";
      hoverImage.style.opacity = "1";
    });

    item.addEventListener("mouseleave", function () {
      const defaultImage = this.querySelector(".default-image");
      const hoverImage = this.querySelector(".hover-image");

      defaultImage.style.opacity = "1";
      hoverImage.style.opacity = "0";
    });
  });

  // Animation effects for CTA button
  const ctaButton = document.querySelector(".btn-cta");

  if (ctaButton) {
    ctaButton.addEventListener("mouseenter", () => {
      const animatedLine = document.querySelector(".btn-animated-line");
      if (animatedLine) {
        animatedLine.style.animationDuration = "1s";
      }
    });

    ctaButton.addEventListener("mouseleave", () => {
      const animatedLine = document.querySelector(".btn-animated-line");
      if (animatedLine) {
        animatedLine.style.animationDuration = "2s";
      }
    });
  }

  // Gọi hàm animation cho stats
  startCountAnimation();
});

// Thêm vào file main.js
document.addEventListener("DOMContentLoaded", function () {
  // Xử lý cuộn ngang cho portfolio trên mobile
  const portfolioGrid = document.querySelector(".portfolio-grid");

  if (portfolioGrid && window.innerWidth <= 768) {
    // Thêm chỉ báo cuộn
    const portfolioRight = document.querySelector(".portfolio-right");
    if (portfolioRight) {
      const scrollIndicator = document.createElement("div");
      scrollIndicator.className = "scroll-indicator";
      scrollIndicator.textContent = "Vuốt sang để xem thêm";
      scrollIndicator.style.textAlign = "center";
      scrollIndicator.style.fontSize = "0.8rem";
      scrollIndicator.style.color = "#777";
      scrollIndicator.style.paddingTop = "10px";
      portfolioRight.appendChild(scrollIndicator);

      // Ẩn chỉ báo sau khi người dùng đã cuộn
      portfolioGrid.addEventListener(
        "scroll",
        function () {
          scrollIndicator.style.opacity = "0";
          scrollIndicator.style.transition = "opacity 0.5s ease";
        },
        { once: true }
      );
    }
  }
});

// Auto hover cho Feature 2
document.addEventListener("DOMContentLoaded", function () {
  const featureSocial = document.querySelector(".feature-social");
  const feature1 = document.querySelector(".feature-card:first-child");
  const feature3 = document.querySelector(".feature-cards-grid");

  let currentHovered = null;
  let hoveredByUser = false;

  // Function để thêm class hovered
  function addHoverClass(element) {
    if (currentHovered) {
      currentHovered.classList.remove("hovered");
    }
    element.classList.add("hovered");
    currentHovered = element;
  }

  // Auto hover cho feature 2 khi load trang
  setTimeout(() => {
    if (!hoveredByUser) {
      addHoverClass(featureSocial);
    }
  }, 1000);

  // Xử lý hover bằng mouse
  feature1.addEventListener("mouseenter", function () {
    hoveredByUser = true;
    addHoverClass(feature1);
  });

  featureSocial.addEventListener("mouseenter", function () {
    hoveredByUser = true;
    addHoverClass(featureSocial);
  });

  feature3.addEventListener("mouseenter", function () {
    hoveredByUser = true;
    addHoverClass(feature3);
  });

  // Xử lý khi mouse rời khỏi
  feature1.addEventListener("mouseleave", function () {
    hoveredByUser = false;
    // Quay lại auto hover feature 2 sau khi mouse rời đi
    setTimeout(() => {
      if (!hoveredByUser && !document.querySelector(".hovered")) {
        addHoverClass(featureSocial);
      }
    }, 200);
  });

  featureSocial.addEventListener("mouseleave", function () {
    hoveredByUser = false;
  });

  feature3.addEventListener("mouseleave", function () {
    hoveredByUser = false;
    // Quay lại auto hover feature 2 sau khi mouse rời đi
    setTimeout(() => {
      if (!hoveredByUser && !document.querySelector(".hovered")) {
        addHoverClass(featureSocial);
      }
    }, 200);
  });

  // Kiểm tra khi scroll để auto hover khi feature 2 vào viewport
  window.addEventListener("scroll", function () {
    if (!hoveredByUser) {
      const featureSocialRect = featureSocial.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Nếu feature 2 đang trong viewport
      if (
        featureSocialRect.top < windowHeight * 0.8 &&
        featureSocialRect.bottom > windowHeight * 0.2
      ) {
        addHoverClass(featureSocial);
      }
    }
  });
});

// Đảm bảo có sự kết nối giữa hover của feature3 và các card con
document.addEventListener("DOMContentLoaded", function () {
  const feature3 = document.querySelector(".feature-cards-grid");

  // Khi feature3 được hover, thêm hiệu ứng animation cho các card con
  if (feature3) {
    // Kích hoạt animation staggered khi hover
    feature3.addEventListener("mouseenter", function () {
      // Các hiệu ứng đã được xử lý bằng CSS class .hovered
    });

    // Reset lại trạng thái animation khi không còn hover
    feature3.addEventListener("mouseleave", function () {
      // Các hiệu ứng đã được xử lý bằng CSS class .hovered
    });
  }

  // Cập nhật lại hiệu ứng z-index cho các feature cards
  const featureCards = document.querySelectorAll(
    ".feature-card, .feature-social, .feature-cards-grid"
  );

  featureCards.forEach((card, index) => {
    // Đặt z-index ban đầu
    card.style.zIndex = featureCards.length - index;

    // Xử lý mouseenter để đưa card lên trên cùng
    card.addEventListener("mouseenter", function () {
      // Đưa card này lên trên cùng
      this.style.zIndex = 100;

      // Đảm bảo các card khác có z-index thấp hơn
      featureCards.forEach((otherCard) => {
        if (otherCard !== this) {
          otherCard.style.zIndex =
            featureCards.length - Array.from(featureCards).indexOf(otherCard);
        }
      });
    });
  });
});
