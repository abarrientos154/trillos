<template>
  <div class="row justify-center">
    <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar class="bg-white row justify-between">
        <q-btn round dense flat icon="keyboard_backspace" color="primary" @click="$router.go(-1)"/>
        <q-img src="logo-210x47.png" style="width:140px" />
        <q-btn flat round dense icon="person" color="primary" @click="$router.push('/Datos')"  />
      </q-toolbar>
    </q-header> -->

    <div class="col-12 q-pa-md" v-for="(item, index) in mapeando" :key="index">
      <q-card class="shadow-8" v-if="rol === 3">
        <div class="row justify-around items-center absolute-top">
          <div class="q-ml-sm q-pr-sm">Fecha de Solicitud {{item.creationDate}}</div>
          <div class="row justify-around items-center q-mr-sm q-pr-sm">
            <div class="text-h7 text-grey-9">Nivel de requerimiento</div>
            <div class="row">
              <q-radio v-model="item.colorRadio" keep-color size="xs" val="red" color="red" />
              <q-radio v-model="item.colorRadio" keep-color size="xs" val="orange" color="orange" />
              <q-radio v-model="item.colorRadio" keep-color size="xs" val="blue" color="blue" />
            </div>
          </div>
        </div>
        <div class="column items-center justify-center">
          <div class="text-right text-white q-mt-xl text-h6" :class="`bg-${item.colorRadio}`" style="width:100%">{{item.name}}</div>
        </div>
        <div class="row justify-around q-pb-sm">
          <div class="col-4 q-mt-sm">
            <div>
              <q-avatar size="100px">
                <img :src="baseu + clientId">
              </q-avatar>
            </div>
            <div class="q-mt-sm">
              <div class="row items-center no-wrap">
                <q-icon size="sm" name="person" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{item.fullName}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="phone" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{item.phone}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="place" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{item.direccion}}</div>
              </div>
            </div>
          </div>
          <div class="col-4 q-mt-sm">
            <div class="text-h6">Descripcion</div>
            <div style="height:60px">
              <div class="col-12 q-px-md text-grey-9 ellipsis-3-lines">{{item.descripcion}}</div>
            </div>
            <div class="row q-mt-sm">
              <div class="text-bold">Estado de Solicitud:</div>
              <div class="q-ml-md">Recibiendo cotizaciones</div>
            </div>
            <div class="row q-mt-sm items-center no-wrap">
              <q-icon size="sm" name="clean_hands" color="grey-7" />
              <div class="text-grey-9 ellipsis">{{item.categoryName}}</div>
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <div class="col-12 q-pa-md" v-for="(item, index) in mapeando" :key="index">
      <q-card class="shadow-8" v-if="rol === 2">
        <div class="row justify-around items-center absolute-top">
          <div class="q-ml-sm q-pr-sm">Fecha de Solicitud {{item.creationDate}}</div>
          <div class="row justify-around items-center q-mr-sm q-pr-sm">
            <div class="text-h7 text-grey-9">Nivel de requerimiento</div>
            <div class="row">
              <q-radio v-model="item.colorRadio" keep-color size="xs" val="red" color="red" />
              <q-radio v-model="item.colorRadio" keep-color size="xs" val="orange" color="orange" />
              <q-radio v-model="item.colorRadio" keep-color size="xs" val="blue" color="blue" />
            </div>
          </div>
        </div>
        <div class="column items-center justify-center">
          <div class="text-right text-white q-mt-xl text-h6" :class="`bg-${item.colorRadio}`" style="width:100%">{{item.name}}</div>
        </div>
        <div class="row justify-around q-pb-sm">
          <div class="col-4 q-mt-sm">
            <div>
              <q-avatar size="100px">
                <img :src="baseu + clientId">
              </q-avatar>
            </div>
            <div class="q-mt-sm">
              <div class="row items-center no-wrap">
                <q-icon size="sm" name="person" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{item.fullName}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="phone" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{item.phone}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="place" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{item.direccion}}</div>
              </div>
            </div>
          </div>
          <div class="col-4 q-mt-sm">
            <div class="text-h6">Descripcion</div>
            <div style="height:60px">
              <div class="col-12 q-px-md text-grey-9 ellipsis-3-lines">{{item.descripcion}}</div>
            </div>
            <div class="row q-mt-sm">
              <div class="text-bold">Estado de Solicitud:</div>
              <div class="q-ml-md">Recibiendo cotizaciones</div>
            </div>
            <div class="row q-mt-sm items-center no-wrap">
              <q-icon size="sm" name="clean_hands" color="grey-7" />
              <div class="text-grey-9 ellipsis">{{item.categoryName}}</div>
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <q-separator horizontal></q-separator>

    <q-page-container>
      <div v-if="cotizarBtn" class="row justify-end full-width q-pa-sm">
        <q-btn no-caps class="shadow-11" color="primary" text-color="black" label="Cotizar" @click="cotizar = true" />
      </div>
      <div v-if="verCotizacion" class="row justify-end full-width q-pa-sm">
        <q-btn no-caps class="shadow-11" color="primary" text-color="black" :label="data.status === 'Cotizado' ? 'Ver Cotización' : 'Ver Presupuesto'" @click="$router.push('/cotizacion/' + data.id_cotization + '/presupuesto')" />
      </div>
      <q-separator v-if="cotizarBtn || verCotizacion" />

      <q-dialog persistent v-model="cotizar" transition-show="slide-up" transition-hide="slide-down" >
        <enviar-cotizacion :ruta="id" accion="cotizar" />
      </q-dialog>

      <q-dialog persistent v-model="presupuesto" transition-show="slide-up" transition-hide="slide-down" >
        <enviar-cotizacion @presupuesto="presupuesto = false" :ruta="id" accion="presupuesto" />
      </q-dialog>
      <!-- <div class="column items-center justify-center">
      <div class="text-subtitle1">{{data.nombre_necesidad}}</div>
      </div> -->
      <div class="q-pa-sm" style="width: 100%; max-width: 400px">
        <q-chat-message
        />
        <q-chat-message
          v-for="mens in this.data.messages" :key="mens.id"
          :name="mens.full_name"
          :text="[mens.message]"
          :avatar="mens.send === true ? baseu + clientId : baseu + supplierId"
          :stamp="mens.stamp"
          :sent="mens.send"
          bg-color="grey-2"
          text-color="grey-8"
          size="6"
        />
        <div id="fin"></div>
      </div>
    </q-page-container>

    <q-footer elevated class="bg-white row">
        <q-input
           @keyup.enter="sendChat()"
            v-model="text"
            placeholder="Mensaje..."
            class="q-pa-sm col-10"
            bg-color="yellow-2"
            autogrow
            outlined
            />
        <q-icon href="#fin" @click="sendChat()" size="40px" name="send" color="primary" class="col-2" />
    </q-footer>
    </q-layout>
  </div>
</template>
<script>
import moment from 'moment'
import env from '../env'
import EnviarCotizacion from '../components/EnviarCotizacion'
export default {
  components: {
    EnviarCotizacion
  },
  data () {
    return {
      id: this.$route.params.id,
      text: '',
      baseu: '',
      request: [],
      rol: 0,
      data2: '',
      cotizarBtn: false,
      cotizar: false,
      verCotizacion: false,
      presupuesto: false,
      form: {},
      info: {},
      date: moment().format('DD-MMMM-YYYY'),
      data: {
        datos_proveedor: {
          full_name: 'Proveedor'
        },
        datos_cliente: {
          full_name: 'Cliente'
        }
      },
      clientId: '',
      supplierId: ''
    }
  },
  mounted () {
    this.getinfo()
    this.baseu = env.apiUrl + '/perfil_img/perfil'
  },
  methods: {
    getinfo () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          this.$api.get('show_all_messages/' + this.id).then(v => {
            if (v) {
              this.request.push(v.data_request)
              console.log('this.request :>> ', this.request)
              this.clientId = v.datos_cliente
              this.supplierId = v.datos_proveedor
              this.data = v
              console.log(v, 'data de v')
              if (this.data.status === 'Pendiente' && this.rol === 3) {
                this.cotizarBtn = true
                this.presupuesto = true
              }
              if ((this.data.status === 'Presupuesto' || this.data.status === 'Cotizado' || this.data.status === 'Rechazado') && this.rol === 3) {
                this.cotizarBtn = true
              }
              if (this.data.status === 'Rechazado' && this.rol === 3) {
                this.$q.dialog({
                  title: '¡Atención!',
                  message: 'La cotización ha sido rechazada.'
                }).onOk(() => {

                })
              }
              if ((this.data.status === 'Cotizado' || this.data.status === 'Presupuesto') && this.rol === 2) {
                this.verCotizacion = true
              }
            }
          })
        }
      })
    },
    sendChat () {
      if (this.text !== '') {
        this.$api.post('send_message/' + this.id, { message: this.text }).then(res => {
          this.text = ''
          this.$api.get('show_all_messages/' + this.id).then(v => {
            if (v) {
              this.data.messages = v.messages
            }
          })
        })
      }
    }
  },
  computed: {
    mapeando () {
      return this.request.map(v => {
        return {
          ...v,
          colorRadio: v.necesidad === 'Urgente (1 a 3 Horas)' ? 'red' : v.necesidad === 'Medio (5 a 24 Horas)' ? 'orange' : 'blue'
        }
      })
    }
  }
}
</script>
