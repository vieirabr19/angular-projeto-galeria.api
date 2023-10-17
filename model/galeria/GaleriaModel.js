const db = require("../../banco/dbConexao");

class GaleriaModel {
  static getAll(callback) {
    return db.query("SELECT * FROM galeria", callback);
  }

  static getById(id, callback) {
    return db.query(
      "SELECT * FROM galeria WHERE id_galeria = ?",
      [id],
      callback
    );
  }

  static create(dados, callback) {
    return db.query(
      "INSERT INTO galeria (titulo, caminho) VALUES(?, ?)",
      [dados.titulo, dados.caminho],
      callback
    );
  }

  static delete(id, callback) {
    return db.query("DELETE FROM galeria WHERE id_galeria = ?", [id], callback);
  }

  static update(dados, callback) {
    //verificar img
    if (dados.caminho != null) {
      return db.query(
        "UPDATE galeria SET titulo = ?, caminho = ? WHERE id_galeria = ?",
        [dados.titulo, dados.caminho, dados.id_galeria],
        callback
      );
    } else {
      return db.query(
        "UPDATE galeria SET titulo = ? WHERE id_galeria = ?",
        [dados.titulo, dados.id_galeria],
        callback
      );
    }
  }
}

module.exports = GaleriaModel;
