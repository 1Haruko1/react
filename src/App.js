import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import './App.css';

// Оптимизированный список
const ExpensiveList = memo(({ items, onItemClick }) => {
  console.log('ExpensiveList rendered');
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.id} onClick={() => onItemClick(item)}>
          {item.name} (цена: {item.price} ₽)
        </li>
      ))}
    </ul>
  );
});

function App() {
  // Состояние счётчика и ввода
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  
  // Состояние темы
  const [theme, setTheme] = useState('dark');

  // Список товаров
  const [items, setItems] = useState([
    { id: 1, name: 'Безделушка', price: 100 },
    { id: 2, name: 'Тупая безделушка', price: 200 },
  ]);
  const [filteredItems, setFilteredItems] = useState(items);

  // Эффект: обновление заголовка
  useEffect(() => {
    console.log(`Изменения в твоей сраке: ${count}`);
    document.title = `Хуев в жопе: ${count}`;
  }, [count]);

  // Эффект: монтаж/размонтирование
  useEffect(() => {
    console.log('Компонент смонтирован');
    return () => console.log('Компонент размонтирован');
  }, []);

  // Добавление товара
  const addItem = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: prevItems.length + 1,
        name: `Безделушка ${prevItems.length + 1}`,
        price: Math.floor(Math.random() * 500),
      },
    ]);
  }, []);

  // Клик по товару
  const handleItemClick = useCallback((item) => {
    alert(`Ты проебал деньги на: ${item.name}, цена: ${item.price} ₽`);
  }, []);

  // Общая цена
  const totalPrice = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.price, 0);
  }, [filteredItems]);

  // Фильтрация по вводу
  useEffect(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [inputValue, items]);

  // Переключение темы
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <h1>Ебать в рот этот реакт</h1>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Переключить на ${theme === 'dark' ? 'светлую' : 'тёмную'} тему`}
        >
          {theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
        </button>
      </header>

      <main>
        {/* Счётчик */}
        <section className="counter">
          <h2>Хуев в жопе: {count}</h2>
          <button onClick={() => setCount(count + 1)}>Больше</button>
          <button onClick={() => setCount(count - 1)}>Меньше</button>
        </section>

        {/* Поиск */}
        <section className="search">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ищи ебать тебя в рот..."
          />
        </section>

        {/* Список товаров */}
        <section className="items">
          <h2>Безделушки ({filteredItems.length})</h2>
          <p>Смерть в нищете: {totalPrice} ₽</p>
          <ExpensiveList items={filteredItems} onItemClick={handleItemClick} />
        </section>

        {/* Кнопка добавления */}
        <button onClick={addItem}>Добавить хуйню</button>
      </main>
    </div>
  );
}

export default App;
