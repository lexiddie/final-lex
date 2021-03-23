export const manipulateAll = (categories) => {
  categories.sort((a, b) => (a.name < b.name ? -1 : 1));
  const temps = categories.filter((i) => i.id !== '');
  temps.unshift({ id: '', name: '-- All --', createdAt: new Date() });
  return temps;
};

export const manipulateEdition = (categories) => {
  categories.sort((a, b) => (a.name < b.name ? -1 : 1));
  const temps = categories.filter((i) => i.id !== '');
  temps.unshift({ id: '', name: 'Uncategorised', createdAt: new Date() });
  return temps;
};

export const manipulateJournals = (journals, categories, categoryId) => {
  journals.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  let temps = [];
  journals.forEach((element) => {
    categories.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    const category = categories.filter((obj) => obj.id === element.categoryId)[0];
    if (category !== undefined) {
      const current = {
        ...element,
        category: category.name
      };
      temps.push(current);
    } else {
      const current = {
        ...element,
        category: 'Uncategorised'
      };
      temps.push(current);
    }
  });
  if (categoryId !== '') {
    temps = temps.filter((i) => i.categoryId === categoryId);
  }
  return temps;
};

export const findCategoryIndex = (categories, categoryId) => {
  categories.sort((a, b) => (a.name < b.name ? -1 : 1));
  let index = 0;
  categories.forEach((item, idx) => {
    if (item.id === categoryId) {
      index = idx + 1;
      return;
    }
  });
  return index;
};
