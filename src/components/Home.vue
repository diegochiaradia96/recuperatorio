<template>
<div class="jumbotron">
  <!-- INICIO FORMULARIO -->
    <div class="text-center ml-3"><h3>Nuevo Pago</h3></div>

    <form novalidate autocomplete="off" class="p-3 mt-3 text-left" @submit.prevent="send()">
      <div class="form-group col-4">
          <label for="nombre"><h4>Nombre</h4></label>
          <input 
            type="text"
            id="nombre"
            class="form-control"
            v-model="v.f.nombre.$model"
          >
          <div v-if="v.f.nombre.$error && v.f.nombre.$dirty" class="alert alert-danger mt-1">
            <div v-if="v.f.nombre.required.$invalid">Este campo es requerido</div>
          </div>
      </div>
          <div class="form-group col-4">
                <label for="dni"><h4>DNI</h4></label>
                <input 
                    type="text"
                    id="dni"
                    class="form-control"
                    v-model="v.f.dni.$model"
                >
                <div v-if="v.f.dni.$error && v.f.dni.$dirty" class="alert alert-danger mt-1">
                    <div v-if="v.f.dni.required.$invalid">Este campo es requerido</div>
                </div>
          </div>

          <div class="form-group  col-4">
                <label for="monto"><h4>Monto</h4></label>
                <input 
                    type="text-area"
                    id="monto"
                    class="form-control"
                    v-model="v.f.monto.$model"
                 >
                <div v-if="v.f.monto.$error && v.f.monto.$dirty" class="alert alert-danger mt-1">
                    <div v-if="v.f.monto.numeric.$invalid">Este campo es requerido</div>
                    <div v-if="v.f.monto.numeric.$invalid">Este campo debe tiene que ser numerico</div>
                    
                </div>
          </div>
          <div class="form-group  col-4">
                <label for="pago"><h4>Pago</h4></label>
                <input 
                    type="text-area"
                    id="pago"
                    class="form-control"
                    v-model="v.f.pago.$model"
                 >
                <div v-if="v.f.pago.$error && v.f.pago.$dirty" class="alert alert-danger mt-1">
                    <div v-if="v.f.pago.required.$invalid">Este campo es requerido</div>
                    <div v-if="v.f.pago.numeric.$invalid">Este campo tiene que ser numerico</div>
                </div>
          </div>
          
     <div id="botones" class="form-group">
        <div class="text" align="right">   
          
          <input
            id="publicar"
            type="submit"
            :disabled="v.$invalid"
            class="btn btn-dark"
            value="Publicar"
          >
          &nbsp;
          &nbsp;
          
          <input
            id="cancelar"
            type="button"
            @click="cancel()"
            class="btn btn-light"
            value="Cancelar"
          >
        </div>
        </div>
    </form>
 <!-- FIN DEL FORMULARIO -->

<!-- INICIO VISTA -->
<div id="encabezado">
    <h2>Lista de Pagos</h2>
    <div class= "text" align="right">
      <button id="verChoice" class="btn btn-primary" @click="verChoice()">Ver choice</button>
     </div>
      
    </div>
    <hr />
    <br>
    <div v-if="pagos.length">
      <table class="table">
        <thead class="thead-dark">
          <tr :style="{color:'NAVY'}">
            <th scope="col">Nombre</th>
            <th scope="col">dni</th>
            <th scope="col">monto</th>
            <th scope="col">pago</th>
            <th scope="col">Fecha de pago</th>
          </tr>
        </thead >
        <tr v-for="(pago, index) in pagos" :key="index">
          <td scope="col"> <p>{{ pasarAMayuscula(pago.nombre) }}</p> </td>
          <td scope="col"> <p>{{ pago.dni }}</p> </td>
          <td scope="col"> <a><b>{{ pago.monto }}</b></a> </td>
          <td scope="col"> <a><b>{{ pago.pago }}</b></a> </td>
          <td scope="col"> <p>{{ formatearFechaHora(pago.createdAt) }}</p> </td>                   
          <td scope="col"> <button id="eliminarPago" class="btn btn-dark" @click="eliminarPago(pago.id)">Eliminar</button> </td>
        </tr>
      </table>
    </div>
    <div v-if ="!pagos.length" class="alert alert-warning"> <h5>No hay pagos realizados</h5> </div>
    <div class="footer-copyright text-center py-3">© Diego Chiaradia Recuperatorio </div>
<!-- FIN VISTA -->
</div>
</template>




<script>
import { useVuelidate } from '@vuelidate/core'
import { required, numeric} from '@vuelidate/validators'  
import { reactive } from 'vue'
 import filters from '../filters'
  export default  {
    name: 'src-components-form',
    props: [],
    mixins: [filters],
    mounted () {
      this.getPagoFormAxios()
    },
    data () {
      return {
         pagos: [],
          url : 'https://5fb95bc62f145f0016c3ce0b.mockapi.io/pagos/'
      }
    },
     setup () {
      const f = reactive({
        nombre: '',
        dni: null,
        monto: null,
        pago: null
      })
      const rules = {
        f: {
          nombre: { 
            required
          },
          dni: { 
            required
          },
          monto: {
            required,
            numeric
            
          },
          pago: {
            required,
            numeric
            
          }
        }
      }
      const v = useVuelidate(rules, { f })
      return { f,v }
    },
   
    methods: {
      async sendDatosFormAxios(datos) {
            try {
                let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
                console.log(res.data)
            }
            catch(error) {
              console.log('HTTP POST ERROR', error)
            }
        },
        async getDatosFormAxios() {
            try {
              let res = await this.axios(this.url)
              console.log(res.data)
            }
            catch(error) {
              console.log('HTTP GET ERROR', error)
            }
        },
        async send() {
            this.v.$touch()
            if(!this.v.$invalid) {
              let form = this.f
              console.log(form)
              await this.sendDatosFormAxios(form)
              this.f = this.resetForm()
              this.v.$reset()
              this.$router.push({ name: 'Home' })
            }
        },
        cancel() {
        this.resetForm()
        this.v.$reset()
        this.$router.push({ name: 'Home' })
        },
        resetForm() {
            return {
               nombre: '',
               descripcion : '',
               email : ''
            }
        },
       //metodos de tabla
        verChoice() {
        this.$router.push({ name: 'Choice' })
        
      },
       async getPagoFormAxios() {
        try {
          let res = await this.axios(this.url)
          this.pagos = res.data
          console.log(res.data)
        } 
        catch(error) {
          console.log('HTTP GET ERROR', error)
        }
      },
      eliminarPago(id) {
          console.log('delete',id)

          this.axios.delete(this.url+id)
            .then(res => {
              let pago = res.data
              console.log(pago)
              let offset = this.pagos.findIndex(pago => pago.id == id)
              this.pagos.splice(offset,1)
            })
            .catch(error => console.log('HTTP DELETE ERROR', error))
      },
            colorPago(pago) {
            let color
             if(pago.monto < pago.pago) {color = 'blue'}
              else if (pago.monto > pago.pago) {color = 'red'}
              else {color = 'green'}
              return color
            }
    },
    computed: {
            
    }
    
}


</script>

<style scoped lang="css">
  .src-components-form {

  }
</style>