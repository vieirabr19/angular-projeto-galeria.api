const express = require("express");
const router = express.Router();
const GaleriaModel = require("../model/galeria/GaleriaModel");
const RespostaApi = require("../model/RespostaApi");

const fs = require("fs");
const pastaPublica = "public/imagens/";

router.get("/", (req, res, next) => {
  let resposta = new RespostaApi();

  GaleriaModel.getAll((erro, returno) => {
    if (erro) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro";
      console.log("ERRO:", erro);
    } else {
      resposta.dados = returno;
    }

    res.json(resposta);
  });
});

router.get("/:id", (req, res, next) => {
  let resposta = new RespostaApi();

  GaleriaModel.getById(req.params.id, (erro, returno) => {
    if (erro) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro";
      console.log("ERRO:", erro);
    } else {
      if (!returno.length) {
        resposta.erro = true;
        resposta.msg = "Registro não encontrado!";
      } else {
        resposta.dados = returno;
      }
    }

    res.json(resposta);
  });
});

router.post("/?", (req, res, next) => {
  const resposta = new RespostaApi();
  console.log("BODY:", req.body);

  if (req.body.dados_imagem != null) {
    let bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, "base64");
    let dataAtual = new Date()
      .toLocaleString()
      .replace(/\//g, "")
      .replace(/:/g, "")
      .replace(/-/g, "")
      .replace(/ /g, "");
    let nomeImagemCaminho =
      pastaPublica + dataAtual + req.body.dados_imagem.nome_arquivo;
    fs.writeFileSync(nomeImagemCaminho, bitmap);
    req.body.caminho = nomeImagemCaminho;

    GaleriaModel.create(req.body, (erro, retorno) => {
      if (erro) {
        resposta.erro = true;
        resposta.msg = "Ocorreu um erro!";
        console.log("Erro =>>>", erro);
      } else {
        if (retorno.affectedRows > 0) {
          resposta.msg = "Cadastro realizado com sucesso!";
        } else {
          resposta.erro = true;
          resposta.msg = "Não foi possível realizar o cadastro!";
        }
      }

      console.log("Resp:", resposta);
      res.json(resposta);
    });
  } else {
    resposta.erro = true;
    resposta.msg = "Não foi enviado nenhuma imagem.";
    console.log("Erro =>>>", resposta.msg);
    res.json(resposta);
  }
});

router.delete("/:id", (req, res, next) => {
  const resposta = new RespostaApi();

  GaleriaModel.delete(req.params.id, (erro, retorno) => {
    if (erro) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro!";
      console.log("Erro =>>>>", erro);
    } else {
      if (retorno.affectedRows > 0) {
        resposta.msg = "Item excluído com sucesso!";
      } else {
        resposta.erro = true;
        resposta.msg = "Não foi possivel excluir o portfolio!";
      }
    }

    console.log("Resp:", resposta);
    res.json(resposta);
  });
});

router.put("/", (req, res, next) => {
  const resposta = new RespostaApi();

  if (req.body.dados_imagem != null) {
    //salvar a imagem
    //let bitmap = new Buffer(req.body.dados_imagem.imagem_base64, 'base64');
    //Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from()
    let bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, "base64");
    let dataAtual = new Date()
      .toLocaleString()
      .replace(/\//g, "")
      .replace(/:/g, "")
      .replace(/-/g, "")
      .replace(/ /g, "");
    let nomeImagemCaminho =
      pastaPublica + dataAtual + req.body.dados_imagem.nome_arquivo;
    fs.writeFileSync(nomeImagemCaminho, bitmap);
    req.body.caminho = nomeImagemCaminho;
  }

  GaleriaModel.update(req.body, (erro, retorno) => {
    if (erro) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro!";
      console.log("Erro =>>>>", erro);
    } else {
      if (retorno.affectedRows > 0) {
        resposta.msg = "Item alterado com sucesso!";
      } else {
        resposta.erro = true;
        resposta.msg = "Não foi possivel alterar o portfolio!";
      }
    }

    console.log("Resp:", resposta);
    res.json(resposta);
  });
});

module.exports = router;
