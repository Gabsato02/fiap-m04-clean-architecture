export const closeModal = (id: string) => {
  const modalElement = document.getElementById(id);

  if (modalElement) {
    const modalInstance = window['bootstrap'].Modal.getInstance(modalElement);

    if (modalInstance) {
      modalInstance.hide();
    } else {
      const newModalInstance = new window['boostrap'].Modal(modalElement);
      newModalInstance.hide();
    }
  }
};