class UserController{
  constructor(formId,tableId){
    this.formEl = document.getElementById(formId);
    this.tableEl = document.getElementById(tableId);
    this.onSubmit();
  }

  onSubmit(){
    //Funcao para acionar  os eventos quando o botao submit é acionado
    this.formEl.addEventListener("submit",event => {
      //Tira o evento padrão do submit
      event.preventDefault();
      let values = this.getValues();
      this.getPhoto().then(
        (content)=>{
          values.photo= content;
          this.addLine(values);
        },
        (e)=>{
          console.error(e);
        });
      });
    }
    //Metodo para pegar a foto
    getPhoto(){
      return new Promise((resolve,reject)=>{
        let fileReader = new FileReader();
        let elements = [...this.formEl.elements].filter(item=>{
          if (item.name==='photo'){
            return item;
          }
        });
        let file = elements[0].files[0];
        fileReader.onload = () =>{
          resolve(fileReader.result);
        };
        fileReader.oneerror = (e) =>{
          reject(e);
        };
        fileReader.readAsDataURL(file);
      });

    }

    getValues(){
      let user = {};
      [...this.formEl.elements].forEach(function(field,index){
        if(field.name == 'gender'){
          if(field.checked){
            user[field.name] = field.value;
          }
        }else{
          user[field.name] = field.value;
        }
      });
      //Instacia a classe User passando como parametro as variaveis do array User
      return new User(
        user.name,
        user.gender,
        user.birth,
        user.email,
        user.country,
        user.password,
        user.photo,
        user.admin
      );
    }

    //Funcao para adicionar no HTML
    addLine(dataUser){
      this.tableEl.innerHTML = `<tr>
      <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
      <td>${dataUser.name}</td>
      <td>${dataUser.email}</td>
      <td>${dataUser.admin}</td>
      <td>${dataUser.birth}</td>
      <td>
      <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
      <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
      </td>
      </tr>`;
    };

  }
