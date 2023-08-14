import {observable, makeObservable, action} from "mobx";
import FormModel from "@/features/form/model/FormModel";

class FormService<T> {
  @observable
  private formModel: FormModel<T>
  constructor(initialStates: T) {
    makeObservable(this)
    this.formModel = new FormModel<T>(initialStates)
  }
  @action
  handleSubmit(callback: (states: T) => void){
    callback(this.formModel.states)
  }

  get formState() {
    return this.formModel.states
  }
  @action
  setFormState(update: T) {
    this.formModel.states = update
  }
}

export default FormService