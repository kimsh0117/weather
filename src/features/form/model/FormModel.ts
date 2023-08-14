import {observable, makeObservable} from "mobx";
// types
import {Status} from "@/features/form/types/type";

class FormModel<T> {
  @observable
  public states: T
  @observable
  public status: Status = {
    isSubmitting: false,
  }
  constructor(initialStates: T) {
    makeObservable(this)
    this.states = initialStates
  }
}
export default FormModel