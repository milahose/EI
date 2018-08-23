const store = (function() {
  let items = [
    { id: cuid(), name: 'apples', checked: false },
    { id: cuid(), name: 'oranges', checked: false },
    { id: cuid(), name: 'milk', checked: true },
    { id: cuid(), name: 'bread', checked: false }
  ];
  let hideCheckedItems = false;
  let searchTerm = '';

  const findById = (id) => {
    return store.items.find(item => item.id === id);
  };

  const addItem = (name) => {
    try {
      Item.validateName(name);
      store.items.push(Item.create(name));
      render();
    } catch (error) {
      console.log(`Cannot add item: ${error.message}`);
    }
  };

  const findAndToggleChecked = (id) => {
    let foundItem = findById(id);
    console.log('toggle checked found item', foundItem)
    foundItem.checked = !foundItem.checked;
  };

  const findAndUpdateName = (id, newName) => {
    try {
      Item.validateName(newName);
      let item = findById(id);
      item.name = newName;
    } catch (error) {
      console.log(`Cannot update name: ${error.message}`);
    }
  };

  const findAndDelete = (id) => {
    const index = store.items.findIndex(item => item.id === id);
    store.items.splice(index, 1);
  };

  const toggleCheckedFilter = () => {
    store.hideCheckedItems = !store.hideCheckedItems;
  };

  const setSearchTerm = (val) => {
    store.searchTerm = val;
  };

  return { 
    items,
    hideCheckedItems,
    searchTerm,
    findById,
    addItem,
    findAndToggleChecked,
    findAndUpdateName,
    findAndDelete,
    toggleCheckedFilter,
    setSearchTerm
  };
})();