<script setup>
import router from '@/router';
import {ref, inject} from 'vue';

const urlAPI = inject('urlAPI');
const emailPattern = inject('emailPattern');
const fullname = ref('');
const email = ref('');
const phone = ref('');
const errores = ref([]);

function guardar(e){
    let listaErrores = [];
    e.preventDefault();

    if (fullname.value.trim() === ""){
        listaErrores = [...listaErrores, 'Fullname required.'];
    }
    if (email.value.trim() === "" || !emailPattern.test(email.value)){
        listaErrores = [...listaErrores, 'Invalid email.'];
    }
    if (phone.value.trim() === ""){
        listaErrores = [...listaErrores, 'Phone required.'];
    }

    errores.value = listaErrores;

    if (listaErrores.length === 0){
        const parametros = {
            fullname: fullname.value.trim(), 
            email: email.value.trim(),
            phone: phone.value.trim()
        };

        fetch(urlAPI,{
            method: 'POST',
            headers: {'Content-Type' : 'Application/json'},
            body: JSON.stringify(parametros)
        }).then((res) => {
            if (res.ok && res.status >= 200 && res.status < 300){
                alert("Contacto agregado.");
                router.push({name: 'home'});
            }
        }).catch(error => {
            console.log(error);
            alert("No se pudo agregar el contacto.");
        });
    }
}
</script>

<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Create Contact
                </div>
                <div class="card-body">
                    <form @submit="guardar(e)">
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="bi bi-person-lines-fill"></i>
                            </span>
                            <input type="text" v-model="fullname" id="nombre" class="form-control" placeholder="Fullname" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="bi bi-envelope-at-fill"></i>
                            </span>
                            <input type="text" v-model="email" id="correo" class="form-control" placeholder="Email" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="bi bi-telephone-fill"></i>
                            </span>
                            <input type="text" v-model="phone" id="telefono" class="form-control" placeholder="Phone" required>
                        </div>
                        <div class="d-grid col-6 mx-auto">
                            <button class="btn btn-success" @click="(e) => guardar(e)">
                                <i class="bi bi-floppy-fill">&nbsp;Save</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="errores.length > 0" class="card">
                <div class="card-body">
                    <div class="alert alert-danger" role="alert">
                        <ul>
                            <li v-for="error, i in errores" :key="i++">
                                {{ error }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>