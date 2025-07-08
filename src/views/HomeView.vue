<script setup>
import router from '@/router';
import {ref, onMounted, inject} from 'vue'
import { RouterLink } from 'vue-router';

const urlAPI = inject('urlAPI');
const contacts = ref(null);

async function getContacts(){
    try {
        const res = await fetch(urlAPI);
        
        if (!res.ok || res.status < 200 || res.status >= 300){
            console.log(res.status);
        }
        const data = await res.json();

        contacts.value = data;

        // Al inicio hay una pantalla de carga que se oculta al cargar los contactos
        var loadingScreen = document.querySelector('.loading');
        loadingScreen.style.opacity = 0;
        setTimeout(()=>{
	        loadingScreen.style.display = 'none';
        },1000);
    } catch (error) {
        console.log("Error fetching contacts: ", error.name, error.message);
        router.push({name: 'homeNet'}); // redirecciona a la página de inicio alterna
    }
}

async function eliminar(id, fullname){
    if (window.confirm(`¿Deseas eliminar el contacto ${fullname}?`)){
        const urlEliminar = `${urlAPI}/${id}`;

        const res = await fetch(urlEliminar, {
            method: 'DELETE',
            headers: { 'ConTent-Type': 'application/json' }
        });
        if (res.ok && res.status >= 200 && res.status < 300){
            var descripcion = await res.json();
        }
        else{
            alert("No se pudo eliminar el contacto.");
            console.log(res.status);
            return;
        }
        if (descripcion.success){
            alert("Contacto eliminado.");
            getContacts();
        }
    }
}

onMounted(() => {
    getContacts();
});
</script>

<style>
.loading{
  position : fixed;
  top : 50%;
  left : 50%;
  height : 99%;
  width : 100%;
  transform : translate(-50%,-50%);    
  background-color: #DCFFFF;
  transition : opacity ease-in-out 1s;
}
.loading-header {
  height : 90%;
  color : gray;
  font-family : consolas;
  font-size : 30px;
  display : flex;
  justify-content: center;
  align-items : center;
}
</style>

<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th><th>Fullname</th><th>Email</th><th>Phone</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(contact, i) in contacts" :key="contact.id">
                            <td>{{ (i+1) }}</td>
                            <td>{{ contact.fullname }}</td>
                            <td>{{ contact.email }}</td>
                            <td>{{ contact.phone }}</td>
                            <td>
                                <RouterLink :to="{name: 'edit', params: {id: contact.id}}" class="btn btn-warning">
                                    <i class="bi bi-pencil-fill"></i>
                                </RouterLink>&nbsp;
                                <button class="btn btn-danger" @click="eliminar(contact.id, contact.fullname)">
                                    <i class="bi bi-trash3"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="loading">
        <h1 class = "loading-header">Loading...</h1>
    </div>
</template>
