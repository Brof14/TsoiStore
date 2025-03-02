import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";

// Функция для имитации отправки сообщения через API "Дипсика"
async function sendChatMessage(message) {
  try {
    // Замените URL и параметры запроса на ваш реальный API
    const response = await fetch("https://api.deepseek.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Ошибка отправки сообщения:", error);
    return "Извините, произошла ошибка при обработке запроса.";
  }
}

const products = [
  { 
    id: 1, 
    name: "iPhone 13 mini", 
    price: 699, 
    description: "Компактный дизайн с высокопроизводительным процессором.", 
    image: "https://c.dns-shop.ru/thumb/st4/fit/500/500/fa5c7d899c91a9ed36af1451726fadfa/144f55066108fba204f44c6fcf5e08a4ff7d4c160c792a52b623f066af01ba38.jpg",
    specs: "Экран: 5.4\", Процессор: A15, Камера: 12 МП, Аккумулятор: 2438 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 2, 
    name: "iPhone 13 Pro", 
    price: 999, 
    description: "Профессиональная камера, высокое качество сборки и премиальные материалы.", 
    image: "https://c.dns-shop.ru/thumb/st4/fit/500/500/95f6b13c3291a95b9fb3706d5df5e8b1/21be81edd53f20e240edfee4ccdec5d62e3036eee59db09c309ac38312b3648a.jpg",
    specs: "Экран: 6.1\", Процессор: A15, Камера: тройная 12 МП, Аккумулятор: 3095 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 3, 
    name: "iPhone 13 Pro Max", 
    price: 1099, 
    description: "Максимальный экран, продвинутая система камер и выдающаяся производительность.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/84cd5f10fd12a61c7ec534f9a08a4975/7ac21ff969034e2934ce0e6ba23cdf275d3dbdfef2b66a05e668ba46c08f4815.jpg.webp",
    specs: "Экран: 6.7\", Процессор: A15, Камера: тройная 12 МП + LiDAR, Аккумулятор: 4352 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 4, 
    name: "iPhone 14", 
    price: 799, 
    description: "Современный дизайн, улучшенные возможности камеры и энергоэффективность.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b86de7f0b0767878acd93901ed1adb57/fdd9b514f1fa44c476b3182bb32afcd09d9b4f25aa9e12321aa7dd380b0cf711.jpg",
    specs: "Экран: 6.1\", Процессор: A16, Камера: двойная 12 МП, Аккумулятор: 3279 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 5, 
    name: "iPhone 14 Plus", 
    price: 899, 
    description: "Большой экран и увеличенная автономность для максимального удобства.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/668815d36054492a90dece841c497463/8906a454297cb2258848f6c055883ca2c25d15a0dd0530fdca1a1abcc8edddd3.jpg.webp",
    specs: "Экран: 6.7\", Процессор: A16, Камера: двойная 12 МП, Аккумулятор: 4323 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 6, 
    name: "iPhone 14 Pro", 
    price: 999, 
    description: "Премиум-функции камеры и дисплея в стильном корпусе.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/2c808e748ce1766e5d21d07a599bd37b/8854787d650ef21213970d207ed556744a19ff7f5cc5683832b25b5dcca9b9ff.jpg",
    specs: "Экран: 6.1\", Процессор: A16, Камера: тройная 48 МП, Аккумулятор: 3200 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 7, 
    name: "iPhone 14 Pro Max", 
    price: 1099, 
    description: "Максимальная производительность и технологии, созданные для профессионалов.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/1fc73f5f54680ec62ba42005c939f146/c179c8eacc8fd86394b3dd8b2114527e870c13de4af1e61e56a7df4ce7f91760.jpg",
    specs: "Экран: 6.7\", Процессор: A16, Камера: тройная 48 МП + LiDAR, Аккумулятор: 4323 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 8, 
    name: "iPhone 15", 
    price: 799, 
    description: "Новые возможности и современный дизайн для ежедневного использования.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/41edbfdd1b4ef4a38f3ac15b85e02902/2258685cc32bbd96de406852bd9b2d94916029658cd6fa120a9f97a4bc0af297.jpg",
    specs: "Экран: 6.1\", Процессор: A17, Камера: двойная 12 МП, Аккумулятор: 3300 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 9, 
    name: "iPhone 15 Plus", 
    price: 899, 
    description: "Более крупный дисплей и улучшенная автономность в элегантном корпусе.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/d154d3bad7e0a3d5196cc3a7ce976f30/8db273f27cca57e55f1ee81d8df0f0719b036d1421d114d01684881a1d2b7ce4.jpg",
    specs: "Экран: 6.7\", Процессор: A17, Камера: двойная 12 МП, Аккумулятор: 4200 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 10, 
    name: "iPhone 15 Pro", 
    price: 999, 
    description: "Выдающаяся производительность и новейшие технологии для требовательных пользователей.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/31b28373068528817401be1fa0f72ff2/57c3fa75db8745654a371cbec253d141e7b1ac632f61e9dce6b5bd421941132e.jpg",
    specs: "Экран: 6.1\", Процессор: A17 Pro, Камера: тройная 48 МП, Аккумулятор: 3500 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 11, 
    name: "iPhone 15 Pro Max", 
    price: 1199, 
    description: "Премиум-класс с максимальными возможностями для профессионалов.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/70f179e1d08dc5a9cb371beb210399b0/1e3d6dc283feae1a340a1d1fbdb7a9411a9ba77beb798b5b19d40762feaa2944.jpg",
    specs: "Экран: 6.7\", Процессор: A17 Pro, Камера: тройная 48 МП + LiDAR, Аккумулятор: 4500 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 12, 
    name: "iPhone 16", 
    price: 899, 
    description: "Инновационный дизайн, новые технологии и элегантность в каждой детали.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/8b5bc89c7adc24c8d3f7e454071fc390/0dfebbfdb98e7d9d5a716fcc2ae849859267a29a5fca9078bb42c9ad5d6ee9fe.jpg",
    specs: "Экран: 6.1\", Процессор: A18, Камера: двойная 12 МП, Аккумулятор: 3400 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 13, 
    name: "iPhone 16 Plus", 
    price: 999, 
    description: "Более крупный экран и усовершенствованные функции для повседневного использования.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/ccf98895b515a97818fd2281641ef974/f40fa7fd695ee81aaa670fe4053ce50ebf3b358cb0307064a42fa3f0be543d13.jpg",
    specs: "Экран: 6.7\", Процессор: A18, Камера: двойная 12 МП, Аккумулятор: 4200 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 14, 
    name: "iPhone 16 Pro", 
    price: 1099, 
    description: "Высокая производительность, премиальный дизайн и передовые технологии в одном устройстве.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b81bab4266d439ca7b9b42ff1cca0a00/059b9bc849b982ab9d1543787672d85ed07a8e12fd8d98dbd343957b27852279.jpg.webp",
    specs: "Экран: 6.1\", Процессор: A18 Pro, Камера: тройная 48 МП, Аккумулятор: 3600 мА·ч, Память: 128/256/512 ГБ" 
  },
  { 
    id: 15, 
    name: "iPhone 16 Pro Max", 
    price: 1299, 
    description: "Лучший выбор для профессионалов с максимальными характеристиками и эксклюзивным дизайном.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/0765718a0de075eeb7b70e870b0a4287/a571943317c536941223f6847b2cff2535f6f8d1b34c49ce598d8fdcae0573ac.jpg",
    specs: "Экран: 6.7\", Процессор: A18 Pro, Камера: тройная 48 МП + LiDAR, Аккумулятор: 4800 мА·ч, Память: 128/256/512 ГБ" 
  },
  // Новый продукт для презентации на главной странице
  { 
    id: 16, 
    name: "iPhon 16e", 
    price: 1399, 
    description: "Эксклюзивное устройство с уникальным дизайном и передовыми технологиями. iPhon 16e сочетает элегантность и мощь, предлагая неповторимый опыт использования.", 
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/f2d681d53460155b8cfa2386cd8157c0/79529c9eaf7a7399e5082912b5d03dd67e2043c98ac49e575ea6530176a324a6.jpg.webp",
    specs: "Экран: 6.5\", Процессор: A18 Pro+, Камера: квантовая система 64 МП, Аккумулятор: 5000 мА·ч, Память: 256/512 ГБ, Дополнительно: эксклюзивные финишные покрытия и уникальный дизайн"
  },
];

// Компонент навигации
const Navbar = ({ cartCount, favoritesCount, openChatBot }) => (
  <nav className="navbar">
    <div className="nav-logo">
      <img
        src="https://90.img.avito.st/image/1/1.-xSbzLa2Qf2ta9X74f_jB5xtVf0nTVX_LXtV.-IXtD0TUulDmp4UgBmoBfnbnhH8IZaWlHOz2FzJpwfM"
        alt="Логотип Tsoi Store"
        className="logo"
      />
      <Link to="/">Tsoi Store</Link>
    </div>
    <ul className="nav-links">
      <li>
        <Link to="/">Главная</Link>
      </li>
      <li>
        <Link to="/catalog">Каталог</Link>
      </li>
      <li>
        <Link to="/about">О компании</Link>
      </li>
      <li>
        <Link to="/blog">Блог</Link>
      </li>
      <li>
        <Link to="/promotions">Акции</Link>
      </li>
      <li>
        <Link to="/multimedia">Мультимедиа</Link>
      </li>
    </ul>
    <div className="nav-actions">
      <Link to="/favorites">❤ {favoritesCount}</Link>
      <Link to="/cart">🛒 {cartCount}</Link>
      <button onClick={openChatBot} className="chat-btn">
        Чат
      </button>
    </div>
  </nav>
);

// Компонент подвала
const Footer = ({ openChatBot }) => (
  <footer className="footer">
    <p>&copy; 2025 Tsoi Store. Все права защищены.</p>
    <a href="https://t.me/TsoiStore" target="_blank" rel="noreferrer">
      <i className="fab fa-telegram-plane"></i>
    </a>
    <button onClick={openChatBot} className="chat-btn-footer">
      Чат
    </button>
  </footer>
);

// Главная страница с улучшенным дизайном
const Slider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="slider-container">
      <button className="slider-btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <motion.div
        key={slides[currentSlide].id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="slider-wrapper"
      >
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].caption}
          className="slider-image"
        />
        <div className="slider-caption">{slides[currentSlide].caption}</div>
      </motion.div>
      <button className="slider-btn next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

const Home = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://c.dns-shop.ru/thumb/st1/fit/500/500/f2d681d53460155b8cfa2386cd8157c0/79529c9eaf7a7399e5082912b5d03dd67e2043c98ac49e575ea6530176a324a6.jpg.webp",
      caption: "Эксклюзивный дизайн и передовые технологии",
    },
    {
      id: 2,
      image:
        "https://c.dns-shop.ru/thumb/st1/fit/500/500/3003876e3237db773b5aab901f81a77f/4488fb211fc173d397b514708a6c2c9b306a0545b89ae2be4ef14be69c8cf75d.jpg.webp",
      caption: "Каждая деталь продумана до мелочей",
    },
    {
      id: 3,
      image:
        "https://c.dns-shop.ru/thumb/st1/fit/0/0/5ce0ea3a63f740d4fc4c9ce151dc0852/562975686fac76b3e71e2fbc662d9a062501e071c28bcd1ca9a2e8dcf4596e58.jpg.webp",
      caption: "Идеальный выбор для избранных",
    },
  ];

  return (
    <div className="home">
      {/* Другие блоки страницы */}
      <section className="presentation">
        <div className="presentation-details">
          <div className="presentation-content">
            <h2>iPhon 16e – Новый стандарт эксклюзивности</h2>
            <p>
              Уникальный дизайн, инновационные технологии и непревзойдённая
              производительность. Создан для тех, кто стремится к лучшему.
            </p>
            <ul>
              <li>
                <strong>Экран:</strong> 6.5" Super Retina XDR
              </li>
              <li>
                <strong>Процессор:</strong> A18 Pro+
              </li>
              <li>
                <strong>Камера:</strong> 64 МП с квантовой оптикой
              </li>
              <li>
                <strong>Аккумулятор:</strong> 5000 мА·ч с быстрой зарядкой
              </li>
              <li>
                <strong>Память:</strong> 256/512 ГБ
              </li>
            </ul>
            <button className="cta-btn-alt">Узнать больше</button>
          </div>
          <div className="slider-container-wrapper">
            <Slider slides={slides} />
          </div>
        </div>
      </section>
    </div>
  );
};

// Каталог товаров
const Catalog = ({ addToCart, addToFavorites }) => {
  const navigate = useNavigate();
  return (
    <div className="catalog">
      <h1>Каталог товаров</h1>
      <div className="catalog-grid">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="product-card"
            whileHover={{ scale: 1.05 }}
          >
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p className="price">${product.price}</p>
            <div className="card-actions">
              <button onClick={() => addToCart(product)}>В корзину</button>
              <button onClick={() => addToFavorites(product)}>❤</button>
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="details-btn"
              >
                Подробнее
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Страница подробного описания товара
const ProductDetail = ({ addToCart, addToFavorites }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return <div>Товар не найден</div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="detail-image" />
      <div className="detail-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p>{product.description}</p>
        <h3>Характеристики:</h3>
        <p className="specs">{product.specs}</p>
        <div className="detail-actions">
          <button onClick={() => addToCart(product)}>
            Добавить в корзину
          </button>
          <button onClick={() => addToFavorites(product)}>
            Добавить в избранное
          </button>
        </div>
      </div>
    </div>
  );
};

// Страница корзины
const Cart = ({ cart, removeFromCart, updateCartQuantity }) => {
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return (
    <div className="cart-page">
      <h1>Корзина</h1>
      {cart.length === 0 ? (
        <p>В корзине пусто.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.product.image} alt={item.product.name} />
              <div className="cart-item-info">
                <h2>{item.product.name}</h2>
                <p>Цена: ${item.product.price}</p>
                <p>Количество: {item.quantity}</p>
                <div className="cart-controls">
                  <button
                    onClick={() =>
                      updateCartQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      updateCartQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button onClick={() => removeFromCart(item.product.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <h2>Общая сумма: ${total}</h2>
        <button className="checkout-btn">Оформить заказ</button>
      </div>
    </div>
  );
};

// Страница избранного
const Favorites = ({ favorites, removeFromFavorites }) => (
  <div className="favorites-page">
    <h1>Избранное</h1>
    {favorites.length === 0 ? (
      <p>Список избранных пуст.</p>
    ) : (
      <div className="favorites-items">
        {favorites.map((item, index) => (
          <div key={index} className="favorite-item">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <button onClick={() => removeFromFavorites(item.id)}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Дополнительные страницы
const About = () => (
  <div className="page about">
    <h1>О компании Tsoi Store</h1>
    <p>
      Tsoi Store – эксклюзивный магазин премиальных айфонов. Мы предлагаем
      высококачественную продукцию, индивидуальный подход и безупречный сервис.
    </p>
  </div>
);

const Blog = () => (
  <div className="page blog">
    <h1>Блог</h1>
    <p>
      Читайте статьи о новейших технологиях, обзорах моделей и секретах использования.
      Наш блог – источник экспертных мнений и практических советов.
    </p>
  </div>
);

const Promotions = () => (
  <div className="page promotions">
    <h1>Акции</h1>
    <p>
      Следите за нашими эксклюзивными акциями, сезонными скидками и специальными
      предложениями для постоянных клиентов.
    </p>
  </div>
);

const Multimedia = () => (
  <div className="page multimedia">
    <h1>Мультимедиа</h1>
    <p>
      Видеогалерея, фотоматериалы и интервью с экспертами. Погрузитесь в мир
      технологий с Tsoi Store.
    </p>
  </div>
);

// Чат-бот с улучшенной функциональностью
const ChatBotModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Здравствуйте! Чем могу помочь?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;
    const newMessage = { sender: "user", text: inputMessage };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setLoading(true);
    const reply = await sendChatMessage(inputMessage);
    setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-modal">
      <div className="chat-modal-content">
        <button onClick={onClose} className="modal-close-btn">
          &times;
        </button>
        <h2>Чат поддержки</h2>
        <div className="chat-window" ref={chatWindowRef}>
          {messages.map((msg, index) => (
            <p key={index} className={msg.sender === "bot" ? "bot-message" : "user-message"}>
              <strong>{msg.sender === "bot" ? "Бот:" : "Вы:"}</strong> {msg.text}
            </p>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Введите сообщение..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSendMessage} className="send-btn" disabled={loading}>
            {loading ? "Отправка..." : "Отправить"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Главный компонент приложения
const App = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const addToFavorites = (product) => {
    setFavorites((prev) =>
      prev.find((item) => item.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        favoritesCount={favorites.length}
        openChatBot={() => setIsChatBotOpen(true)}
      />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/catalog"
            element={<Catalog addToCart={addToCart} addToFavorites={addToFavorites} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} addToFavorites={addToFavorites} />}
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} />}
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/multimedia" element={<Multimedia />} />
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
      </div>
      <Footer openChatBot={() => setIsChatBotOpen(true)} />
      {isChatBotOpen && <ChatBotModal onClose={() => setIsChatBotOpen(false)} />}
    </Router>
  );
};

export default App;