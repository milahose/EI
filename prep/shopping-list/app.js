'use strict';

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <form id="updateItem">
        <input class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}" value="${item.name}" />
      </form>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.items.map((item, index) => generateItemElement(item, index));
  return items.join("");
}

function renderShoppingList() {
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function handleItemEdit() {
  let selectedItem;
  $('.js-shopping-list').on('click', '.js-shopping-item', event => {
    selectedItem = $(event.currentTarget).val();
  });

  $('.js-shopping-list').on('submit', '#updateItem', event => {
    event.preventDefault();
    $('.js-shopping-item').blur()

    STORE.items.forEach(item => {
      if (item.name === selectedItem) {
        item.name = $('.js-shopping-item').val();
      }
    });
  });
}

function toggleCheckedForListItem(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteListItem(itemIndex) {
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}

function toggleCheckedItems() {
  let items = STORE.items;

  $('input[type=checkbox]').on('click', () => {
    let checked = $('input[type=checkbox]').prop('checked');
    if (checked) {
      STORE.items = STORE.items.filter(item => !item.checked);
    } else {
      STORE.items = items;
    }
    renderShoppingList();
  });
}

function filterSearchTerm() {
  let items = STORE.items;
  $('#item-search').on('submit', event => event.preventDefault());

  $('#item-search').on('keyup', event => {
    let searchTerm = $('#search').val();

    STORE.items = items.filter(item => {
      return item.name.indexOf(searchTerm) >= 0;
    });

    renderShoppingList();
  });
}

function handleShoppingList() {
  handleItemEdit();
  filterSearchTerm();
  renderShoppingList();
  toggleCheckedItems();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);