import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private apollo: Apollo) { }

  getTodo() {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          {
            todo_todo {
            id
            label
          }
          }
        `,
      })
      .valueChanges
  }

  insertTodo(values) {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          {
            insert_todo_todo(objects: ${values}) {
              returning {
                id
                label
              }
            }
          }
        `,
      })
      .valueChanges
  }

  public removeTodoQuery = gql`
    mutation removeTodoQuery($id: Int!) {
      delete_todo_todo_by_pk(id: $id) {
        id
        label
      }
    }
`;

  removeTodo(id: number) {
    return this.apollo.mutate({
      mutation: this.removeTodoQuery,
      variables: {
        id
      }
    })
  }


  public insertTodoGql = gql`
    mutation insertTodoQuery($id: Int!, $label: String!) {
      insert_todo_todo_one(object: {id: $id, label: $label}) {
        id
        label
      }
    }
`;

  insertTodoData(values: any) {
    return this.apollo.mutate({
      mutation: this.insertTodoGql,
      variables: {
        id: values.id,
        label: values.label
      }
    })
  }

  public updateTodoGql = gql`
    mutation updateTodoQuery($id: Int!, $label: String!) {
      update_todo_todo_by_pk(pk_columns: {id: $id}, _set: {label: $label}) {
        id
        label
      }
    }
  `;

  updateTodoData(id: number, values: any) {
    return this.apollo.mutate({
      mutation: this.updateTodoGql,
      variables: {
        id: id,
        label: values.label
      }
    })
  }

}