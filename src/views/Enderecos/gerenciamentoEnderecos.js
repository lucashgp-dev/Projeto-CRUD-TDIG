import React from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoProfessores = props => {
  const { useState, useEffect } = React;

  const [columns, setAlunos] = useState([
    { title: 'Id', field: 'id' },
    { title: 'rua', field: 'rua', type: 'numerico' },
    { title: 'numero', field: 'numero' },
    { title: 'CEP', field: 'cep' },
    { title: 'cidade', field: 'cidade'},
    { title: 'estado', field: 'estado'},
    { title: 'pais', field: 'pais'}
  ]);

  const [data, setData] = useState([
  ]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("http://demo9865312.mockable.io/get-enderecos")
      .then(response => {

        // create an array of contacts only with relevant data
        // console.log(response.data.lista);
        const alunos = response.data.lista.map(c => {
          return {
            id: c.id,
            rua: c.rua,
            numero: c.numero,
            cep: c.cep,
            cidade: c.cidade,
            estado: c.estado,
            pais: c.pais
          };
        });
        setData(alunos);
      })
      .catch(error => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://demo9865312.mockable.io/post-enderecos", {
        "id": newData.id,
        "rua": newData.rua,
        "numero": newData.numero,
        "cep": newData.cep,
        "cidade": newData.cidade,
        "estado": newData.estado,
        "pais": newData.pais
      })
      .then(function (response) {
        console.log('salvo com sucesso')
      });
  }

  function handleUpdate(newData) {
    axios
      .put("http://demo9865312.mockable.io/put-enderecos", {
        "id": newData.id,
        "rua": newData.rua,
        "numero": newData.numero,
        "cep": newData.cep,
        "cidade": newData.cidade,
        "estado": newData.estado,
        "pais": newData.pais
      })
      .then(function (response) {
        console.log('atualizado com sucesso')
      });
  }

  function handleDelete(newData) {
    axios
      .delete("http://demo9865312.mockable.io/delete-enderecos", {
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
        title="Gerenciamento de Endereços"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleCreate(newData)
                const dataCreate = [...data];
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