<script setup>
import {ref, onMounted, inject} from 'vue'
import { RouterLink } from 'vue-router';
import { createLink, homeLink } from '@/router';

const urlAPI = inject('urlAPINet'); // URL de la API alterna
const contacts = ref(null);

// Actualizo las rutas de los enlaces del menú
// para que apunten a las vistas de la API alterna
if (homeLink.value != "/homeNet") {
    homeLink.value = "/homeNet";
}
if (createLink.value != "/createNet") {
    createLink.value = "/createNet";
}

async function getContacts(){
    try{
        const res = await fetch(urlAPI);
        const data = await res.json();

        contacts.value = data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
        alert("Could not connect to fetch contacts.");
    }
}

async function eliminar(id, fullname){
    if (window.confirm(`Do you want to delete the contact ${fullname}?`)){
        const urlEliminar = `${urlAPI}/${id}`;

        const res = await fetch(urlEliminar, {
            method: 'DELETE',
            headers: { 'ConTent-Type': 'application/json' }
        });
        if (res.ok && res.status >= 200 && res.status < 300){
            alert("Contact deleted.");
            getContacts();
        }
        else{
            alert("Could not delete the contact.");
            console.log(res.status);
            return;
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
                                <RouterLink :to="{name: 'editNet', params: {id: contact.id}}" class="btn btn-warning">
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
