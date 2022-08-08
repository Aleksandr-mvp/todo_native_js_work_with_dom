const main = (document => {
    const todoList = document.getElementById('todo-list')
    const todoForm = document.getElementById('todo-form')
    const addInput = document.getElementById('add-input')
    const todoItems = document.querySelectorAll('.todo-item')

    function addTodoItem(event) {
        event.preventDefault()

        if (addInput.value === '') return alert('Необходимо ввести название задачи.')

        const todoItem = createTodoItem(addInput.value)
        todoList.appendChild(todoItem)

        addInput.value = ''
    }

    function createElement(tag, props, ...children) {
        const element = document.createElement(tag)
        Object.keys(props).forEach(key => element[key] = props[key])

        if (children.length) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    child = document.createTextNode(child)
                }
                element.appendChild(child)
            })
        }
        return element
    }

    function createTodoItem(title) {
        const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox'})
        const label = createElement('label', {className: 'title'}, title)
        const editInput = createElement('input', {type: 'text', className: 'textfield'})
        const editBtn = createElement('button', {className: 'edit'}, 'Изменить')
        const deleteBtn = createElement('button', {className: 'delete'}, 'Удалить')


        const itemTask = createElement('li', {className: 'todo-item'}, checkbox, label, editInput, editBtn,
            deleteBtn)

        bindEvents(itemTask)

        return itemTask
    }

    function bindEvents(task) {
        const checkbox = task.querySelector('.checkbox')
        const editBtn = task.querySelector('button.edit')
        const deleteBtn = task.querySelector('button.delete')

        checkbox.addEventListener('change', toggleTodoItem)
        editBtn.addEventListener('click', editTodoItem)
        deleteBtn.addEventListener('click', deleteTodoItem)
    }

    function toggleTodoItem() {
        const itemTask = this.parentNode
        itemTask.classList.toggle('completed')
    }

    function editTodoItem() {
        const itemTask = this.parentNode
        const title = itemTask.querySelector('.title')
        const editInput = itemTask.querySelector('.textfield')
        const isEditing = itemTask.classList.contains('editing')

        if (isEditing) {
            title.innerText = editInput.value
            this.innerText = 'Изменить'
        } else {
            editInput.value = title.innerText
            this.innerText = 'Сохранить'
        }

        itemTask.classList.toggle('editing')
    }

    function deleteTodoItem() {
        const itemTask = this.parentNode
        todoList.removeChild(itemTask)
    }

    function main() {
        todoForm.addEventListener('submit', addTodoItem)
        todoItems.forEach(item => bindEvents(item))
    }

    return main
})(document)

main()
