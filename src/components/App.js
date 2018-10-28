import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {

    state = {
        input : '', // input 값
        todos : [
            {id:0, text: '리액트 공부하기', done:true},
            {id:1, text: '컴포넌트 스타일링 해보기', done:false}
        ]
    }

    id = 1;
    getId = () => {
        return ++this.id;
    }

    handleChange = (e) => {
        const {value} = e.target;
        this.setState({
            input: value
        });
    }

    handleInsert = () => {
        const {todos, input} = this.state;

        // 새 데이터 객체 만들기
        const newTodo = {
            text : input,
            done:false,
            id:this.getId()
        };

        this.setState({
            todos: [...todos, newTodo],
            input:''
        })
    }

    handleToggle = (id) => {
        // id로 배열의 인덱스 찾기
        const {todos} = this.state;
        const index = todos.findIndex(todo => todo.id ===id);

        const toggled = {
            ...todos[index],
            done: !todos[index].done
        };

        // slice를 사용해 찾은 index 전후의 데이터를 복사
        // 그 사이에 변경된 todo객체 넣어줌
        this.setState({
            todos: [
                ...todos.slice(0, index),
                toggled,
                ...todos.slice(index + 1, todos.length)
            ]
        });
    }

    handleRemove = (id) => {
        const {todos} = this.state;
        const index = todos.findIndex(todo => todo.id === id);

        // 찾은 index 제거
        this.setState({
            todos:[
                ...todos.slice(0,index),
                ...todos.slice(index+1, todos.length)
            ]
        });
    }

    render() {
        const {input, todos} = this.state;
        const {
            handleChange,
            handleInsert,
            handleToggle,
            handleRemove
        } = this;

        return (
            <PageTemplate>
                <TodoInput onChange={handleChange} onInsert={handleInsert} value={input}/>
                <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
            </PageTemplate>
        );
    }
}

export default App;