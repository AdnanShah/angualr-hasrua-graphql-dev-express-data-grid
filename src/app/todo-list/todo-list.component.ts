import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import CustomStore from 'devextreme/data/custom_store';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  customDataSource: CustomStore;

  constructor(private todoService: TodoService, private apollo: Apollo) { }

  public ngOnInit(): void {
    this.getTodoList();
  }


  public getTodoList(): void {
    this.todoService.getTodo().subscribe(({ data, loading }) => {

      if (!loading) {
        this.customDataSource = new CustomStore({
          key: 'id',
          load: () => data.todo_todo,
          insert: (values) => {
            return this.todoService.insertTodoData(values).toPromise()
          },
          update: (key, values) => {
            return this.todoService.updateTodoData(key, values).toPromise()
          },
          remove: (key) => {
            return this.todoService.removeTodo(key).toPromise().then(() => { });
          }
        });
      }

    })
  }
}
