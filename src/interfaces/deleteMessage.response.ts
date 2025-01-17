export interface DeleteSuccess {
  delete: true;
  message: "Hilo eliminado correctamente";
}

export interface DeleteError {
  delete: false;
  massage: "Error al eliminar hilo";
}
