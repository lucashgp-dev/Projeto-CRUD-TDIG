import React from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoProfessores = props => {
  const { useState, useEffect } = React;

  const dinamicObject = [
    { id: 1, rua: "Rua Severino Verônica" },
    { id: 2, rua: "Rua Aprígio Veloso" },
    { id: 3, rua: "Rua Almirante Barroso" },
    { id: 4, rua: "Rua Doutor Vasconcelos" },
    { id: 5, rua: "Rua Baraúnas" },
    { id: 6, rua: "Rua Ana Vilar" }
  ];

  var obj = dinamicObject.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.rua;

    return acc;
  }, {});

  console.log(obj);
  const [columns, setAlunos] = useState([
    { title: 'Id', field: 'id' },
    { title: 'matricula', field: 'matricula', type: 'numerico' },
    { title: 'nome', field: 'nome' },
    { title: 'curso', field: 'curso' },
    { title: 'endereco', field: 'idEndereco', type: 'numerico', lookup:obj }

  ]);

  const [data, setData] = useState([
  ]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("http://demo3147979.mockable.io/get-professores")
      .then(response => {

        // create an array of contacts only with relevant data
        // console.log(response.data.lista);
        const alunos = response.data.lista.map(c => {
          return {
            id: c.id,
            matricula: c.matricula,
            nome: c.nome,
            curso: c.curso,
            idEndereco: c.idEndereco,
          };
        });
        setData(alunos);
      })
      .catch(error => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://demo3147979.mockable.io/post-professores", {
        "id": newData.id,
        "matricula": newData.matricula,
        "nome": newData.nome,
        "curso": newData.curso,
        "idEndereco": newData.idEndereco
      })
      .then(function (response) {
        console.log('salvo com sucesso')
      });
  }

  function handleUpdate(newData) {
    axios
      .put("http://demo3147979.mockable.io/put-professores", {
        "id": newData.id,
        "matricula": newData.matricula,
        "nome": newData.nome,
        "curso": newData.curso,
        "idEndereco": newData.idEndereco

      })
      .then(function (response) {
        console.log('atualizado com sucesso')
      });
  }

  function handleDelete(newData) {
    axios
      .delete("http://demo3147979.mockable.io/delete-professores", {
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
        title="Gerenciamento de Professores"
        columns={columns}
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