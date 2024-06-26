export const selectCategoryOptions = [
  {
    label: 'Легковий автомобіль',
    value: 'B',
  },
  {
    label: 'Вантажний автомобіль',
    value: 'C',
  },
  {
    label: 'Автобус',
    value: 'D',
  },
  {
    label: 'Мотоцикл',
    value: 'A',
  },
  {
    label: 'Причеп',
    value: 'EF',
  },
  {
    label: 'Всі категорії',
    value: '',
  },
];
export const selectAllCategoryOptions = [
  {
    label: 'Мотоцикл/моторолер - до 300 см3',
    value: 'A1',
  },
  {
    label: 'Мотоцикл/моторолер - більш як 300 см3',
    value: 'A2',
  },
  {
    label: 'Легковий автомобіль - до 1600 см3',
    value: 'B1',
  },
  {
    label: 'Легковий автомобіль - 1601 - 2000 см3',
    value: 'B2',
  },
  {
    label: 'Легковий автомобіль - 2001 - 3000 см3',
    value: 'B3',
  },
  {
    label: 'Легковий автомобіль - більш як 3000 см3',
    value: 'B4',
  },
  {
    label:
      'Легковий электромобіль (виключно з силовим электродвигуном, крім гібридних авто)',
    value: 'B5',
  },
  {
    label: 'Вантажний автомобіль - до 2т',
    value: 'C1',
  },
  {
    label: 'Вантажний автомобіль - більш як 2т',
    value: 'C2',
  },
  {
    label: 'Автобус - до 20 місць',
    value: 'D1',
  },
  {
    label: 'Автобус - більше як 20 місць',
    value: 'D2',
  },
  {
    label: 'Причеп до вантажівки',
    value: 'E',
  },
  {
    label: 'Причеп до легкового авто',
    value: 'F',
  },
];

// disabled category that no supported -Start
const disabledCategories = ['C', 'D', 'E', 'F'];
export const withDisabledSelectCategoryOptions = selectCategoryOptions.map(
  (option) =>
    disabledCategories.some((c) => option.value.includes(c))
      ? { ...option, isDisabled: true }
      : option
);

const withDisabledSelectAllCategoryOptions = selectAllCategoryOptions.map(
  (option) =>
    disabledCategories.some((c) => option.value.includes(c))
      ? { ...option, isDisabled: true }
      : option
);
// disabled category that no supported -End

export function selectAutoCategory(category) {
  if (!category) {
    // return selectAllCategoryOptions;
    return withDisabledSelectAllCategoryOptions;
  }
  if (category === 'EF') {
    // return selectAllCategoryOptions.filter(
    //   (categ) => categ.value.includes('E') || categ.value.includes('F')
    // );
    return withDisabledSelectAllCategoryOptions.filter(
      (categ) => categ.value.includes('E') || categ.value.includes('F')
    );
  }
  // return selectAllCategoryOptions.filter((categ) =>
  //   categ.value.includes(category)
  // );
  return withDisabledSelectAllCategoryOptions.filter((categ) =>
    categ.value.includes(category)
  );
}
export function selectAddressOptions(arr) {
  return arr.map((address) => ({
    label: address.nameFull,
    value: address.id,
  }));
}
