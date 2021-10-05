import React from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoProfessores = props => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([]);

  const [alunos, setAlunos] = useState([]);

  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    getProfessores();
    getAlunos();
    handleClick();
  }, []);

  var obj1 = professores.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.nome;

    return acc;
  }, {});
  console.log(obj1);

  var obj2 = alunos.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.nome;

    return acc;
  }, {});
  console.log(obj2);

  


  function getProfessores() {
    axios
      .get("http://demo3147979.mockable.io/get-professores")
      .then(response => {
        const professor = response.data.lista.map(c => {
          return {
            id: c.id,
            nome: c.nome,
          };
        });
        setProfessores(professor);
      })
      .catch(error => console.log(error));
  }

  function getAlunos() {
    axios
      .get("http://demo3147979.mockable.io/get-alunos")
      .then(response => {
        const aluno = response.data.lista.map(c => {
          return {
            id: c.id,
            nome: c.nome,
          };
        });
        setAlunos(aluno);
      })
      .catch(error => console.log(error));
  }

  function handleClick() {
    axios
      .get("http://demo3147979.mockable.io/get-projetos")
      .then(response => {

        // create an array of contacts only with relevant data
        console.log(response.data.lista);
        const alunos = response.data.lista.map(c => {
          return {
            id: c.id,
            tituloProjeto: c.titulo,
            areaProjeto: c.area,
            resumo: c.resumo,
            palavraChave1: c.palavraChave1,
            palavraChave2: c.palavraChave2,
            palavraChave3: c.palavraChave3,
            tituloProjeto: c.tituloProjeto,
            areaProjeto: c.areaProjeto,
            url: c.url,
            idProfessorResponsavel: c.idProfessorResponsavel,
            idAlunoParticipante: c.idAlunoParticipante
          };
        });
        setData(alunos);
      })
      .catch(error => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://demo3147979.mockable.io/post-projetos", {
        "id": newData.id,
        "tituloProjeto": newData.titulo,
        "areaProjeto": newData.area,
        "resumo": newData.resumo,
        "palavraChave1": newData.palavraChave1,
        "palavraChave2": newData.palavraChave2,
        "palavraChave3": newData.palavraChave3,
        "tituloProjeto": newData.tituloProjeto,
        "areaProjeto": newData.areaProjeto,
        "url": newData.url,
        "idProfessorResponsavel": newData.idProfessorResponsavel,
        "idAlunoParticipante": newData.idAlunoParticipante
      })
      .then(function (response) {
        console.log('salvo com sucesso')
      });
  }

  function handleUpdate(newData) {
    axios
      .put("http://demo9865312.mockable.io/put-projetos", {
        "id": newData.id,
        "tituloProjeto": newData.titulo,
        "areaProjeto": newData.area,
        "resumo": newData.resumo,
        "palavraChave1": newData.palavraChave1,
        "palavraChave2": newData.palavraChave2,
        "palavraChave3": newData.palavraChave3,
        "tituloProjeto": newData.tituloProjeto,
        "areaProjeto": newData.areaProjeto,
        "url": newData.url,
        "idProfessorResponsavel": newData.idProfessorResponsavel,
        "idAlunoParticipante": newData.idAlunoParticipante
      })
      .then(function (response) {
        console.log('atualizado com sucesso')
      });
  }

  function handleDelete(newData) {
    axios
      .delete("http://demo9865312.mockable.io/delete-projetos", {
        "id": newData.id
      })
      .then(function (response) {
        console.log('deletado com sucesso')
      });
  }

  return (
    [
      // <Button id = "aew" color="primary" onClick={handleClick}>Consulta</Button>,
      <MaterialTable
        title="Gerenciamento de Projetos"
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Titulo Projeto', field: 'tituloProjeto' },
          { title: 'Area Projeto', field: 'areaProjeto' },
          { title: 'Resumo', field: 'resumo' },
          { title: 'Palavra Chave 1', field: 'palavraChave1' },
          { title: 'Palavra Chave 2', field: 'palavraChave2' },
          { title: 'Palavra Chave 3', field: 'palavraChave3' },
          { title: 'Site', field: 'url' },
          { title: 'Professor Responsavel', field: 'idProfessorResponsavel', lookup:obj1},
          { title: 'Aluno Participante', field: 'idAlunoParticipante',lookup:obj2 }
        ]}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleCreate(newData)
                // setData([...data, newData]);
                const dataCreate = [...data];
                // const index = newData.tableData.id;
                // dataCreate[index] = newData;
                setData([...dataCreate, newData]);

                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleDelete(oldData)
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve()
              }, 1000)
            }),
        }}
      />]
  )
}

export default GerenciamentoProfessores;