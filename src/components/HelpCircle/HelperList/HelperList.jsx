const HelperList = () => {
  return (
    <ul style={{ listStyle: 'none' }}>
      <li>- Учасники війни;</li>
      <li>- Інваліди II групи;</li>
      <li>
        - Громадяни України, які постраждали внаслідок Чорнобильської
        катастрофи, віднесені до I та II категорії;
      </li>
      <li>- Пенсіонери;</li>
      {/* eslint-disable-next-line */}
      <li>*Максимальний об'єм двигуна ТЗ не більше ніж 2500куб.см;</li>
    </ul>
  );
};

export default HelperList;
