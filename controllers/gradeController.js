import { db } from '../models/index.js';
//import { logger } from '../config/logger.js';
import { gradeModel } from '../models/gradeModel.js';

const create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para inclusão vazio',
    });
  }
  
  try {
    const grade = new gradeModel(req.body);
    await grade.save();
    res.send(grade);
    //logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    //logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};
  const grades = await gradeModel.find(condition);
  try {
    res.send(grades);
    //logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    //logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  const grade = await gradeModel.findById({ _id: id });

  if (!grade) {
    res.status(404).send('grade não localizada');
  }

  try {
    res.send(grade);
    //logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    //logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;
  const grade = await gradeModel.findOne({
    _id: id
  });
  if (!grade) {
    res.status(404).send('Conta não localizada');
  }
  grade.name = req.body.name;
  grade.subject = req.body.subject;
  grade.value = req.body.value;
  grade.type = req.body.type;
  await grade.save();

  try {
    res.send({ message: 'Grade atualizado com sucesso' });

    //logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    //logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  const grade = await accountModel.findOneAndDelete({
    _id: id    
  });

  if (!grade) {
    res.status(404).send('Grade nao encontrada');
    return;
  }

  try {
    res.send({ message: 'Grade excluido com sucesso' });

    //logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    //logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  //const id = req.params.id;

  
  try {
    await gradeModel.deleteMany({});
    res.send({
      message: `Grades excluidos`,
    });
    //logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    //logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
