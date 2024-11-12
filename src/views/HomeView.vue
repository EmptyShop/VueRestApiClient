<script setup>
import {ref, onMounted, inject} from 'vue'
import { RouterLink } from 'vue-router';

const urlAPI = inject('urlAPI');
const contacts = ref(null);

async function getContacts(){
    const res = await fetch(urlAPI);
    const data = await res.json();

    contacts.value = data;
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
</template>
