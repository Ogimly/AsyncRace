import { ModalAlert } from '../components/modalAlert/modalAlert';

export const errorHandler = (error: unknown) => {
  new ModalAlert(`[Alert] ${error}`);
  //
};
