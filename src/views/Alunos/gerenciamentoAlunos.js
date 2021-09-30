import React from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoAlunos = props => {
    const { useState, useEffect } = React;

    const [data, setData] = useState([
    ]);

    const [enderecos, setEnderecos] = useState([
    ]);

    const dinamicObject = [
      { id: 1, rua: "Rua um" },
      { id: 2, rua: "Rua dois" },
      { id: 3, rua: "Rua tres" },
      { id: 4, rua: "Rua quatro" },
      { id: 5, rua: "Rua cinco" },
    ];

    function getEnderecos() {
      axios
        .get("http://demo9865312.mockable.io/get-enderecos")
        .then(response => {
          const endereco = response.data.lista.map(c => {
            return {
              id: c.id,
              rua: c.rua,
            };
          });
          setEnderecos(endereco);
        })
        .catch(error => console.log(error));
    }

    const myObject = [
      {...enderecos}
    ]

    var obj = dinamicObject.reduce(function(acc, cur, i) {
      acc[cur.id] = cur.rua;
  
      return acc;
    }, {});
    console.log(obj);

    useEffect(() => {
      getEnderecos();
      handleClick();
    }, []);

    const [columns, setAlunos] = useState([
      { title: 'Id', field: 'id' },
      { title: 'cpf', field: 'cpf'},
      { title: 'matricula', field: 'matricula', type: 'numerico' },
      { title: 'nome', field: 'nome' },
      { title: 'endereco', field: 'idEndereco', lookup: obj, value: " ", emptyValue: () => <div>-</div> },
      { title: 'curso', field: 'curso' }
    ]);

    function handleClick() {
      axios
        .get("http://demo3147979.mockable.io/get-alunos")
        .then(response => {
          const alunos = response.data.lista.map(c => {
            return {
              id: c.id,
              cpf: c.cpf,
              matricula: c.matricula,
              nome: c.nome,
              idEndereco: c.idEndereco,
              curso: c.curso
            };
          });
          setData(alunos);
        })
        .catch(error => console.log(error));
    }

    function handleCreate(newData) {
      axios
        .post("http://demo3147979.mockable.io/post-alunos", {
          "id": newData.id,
          "cpf": newData.cpf,
          "matricula": newData.matricula,
          "nome": newData.nome,
          "idEndereco": newData.idEndereco,
          "curso": newData.curso
        })
        .then(function(response){
          console.log('salvo com sucesso')
        });
    }

    function handleUpdate(newData) {
      axios
        .put("http://demo3147979.mockable.io/put-alunos", {
          "id": newData.id,
          "cpf": newData.cpf,
          "matricula": newData.matricula,
          "nome": newData.nome,
          "idEndereco": newData.idEndereco,
          "curso": newData.curso
        })
        .then(function(response){
          console.log('atualizado com sucesso')
        });
    }

    function handleDelete(newData) {
      axios
        .delete("http://demo3147979.mockable.io/delete-alunos", {
          "id": newData.id
        })
        .then(function(response){
          console.log('deletado com sucesso')
        });
    }
  
    return (
      [
      // <button id = "aew" color="primary" onClick={handleClick}>Consulta</button>,
      <MaterialTable
        title="Gerenciamento de Alunos"
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

  export default GerenciamentoAlunos;