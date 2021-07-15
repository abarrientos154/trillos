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

    <div v-if="data.length > 0" class="col-12 q-pa-md">
        <q-card @click="$router.push('/chat/' + chat._id)" v-for="(chat, index) in data" :key="index">
            <div class="absolute-top-left q-pr-sm q-ml-sm">Ultima vez escrito {{chat.created_at_message}} </div>
            <div class="column items-center justify-center">
              <div class="q-mt-lg row justify-around items-center" :class="chat.viewed === false ? 'bg-orange' : 'bg-primary'" style="width:100%">
                <div v-if="chat.viewed === false" class="row">
                  <div class="text-white">Tienes mensajes</div>
                  <div class="text-white text-bold q-ml-xs">sin leer</div>
                </div>
                <div v-else class="row">
                  <div class="text-white">Todos los mensajes</div>
                  <div class="text-white text-bold q-ml-xs">leidos</div>
                </div>
                <div class="text-white text-h6">{{rol === 2 ? chat.data_supplier.full_name : chat.data_client.full_name + ' ' + chat.data_client.last_name}}</div>
              </div>
            </div>
            <div class="row items-center q-pt-sm q-pb-xl">
              <div class="col-5 row justify-center">
                <q-avatar size="100px">
                  <img :src="chat.data_supplier._id.length > 0 ? baseu + chat.data_supplier._id : 'noimgpro.png'">
                </q-avatar>
              </div>
              <div class="col-7">
                <div class="row q-mt-sm items-center no-wrap">
                  <q-icon size="sm" name="place" color="grey-7" />
                  <div class="text-grey-9 ellipsis">{{chat.country}} / {{chat.city}}</div>
                </div>
                <div class="row q-mt-sm items-center no-wrap">
                  <q-icon size="sm" name="store_mall_directory" color="grey-7" />
                  <div class="text-grey-9 ellipsis">{{chat.data_supplier.direccion}}</div>
                </div>
            </div>
            <div class="row items-center absolute-bottom-right q-ma-sm">
              <q-btn :color="chat.viewed === false ? 'orange' : 'primary'" label="Ver cotización" no-caps style="width:122px" class="q-mr-sm"/>
              <div>
                <div class="text-bold">Servicios del Taller</div>
                <q-avatar square size="30px" v-for="(item, index) in chat.services" :key="index">
                  <img :src="item.icons">
                </q-avatar>
              </div>
            </div>
            </div>
        </q-card>
    </div>

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
      <div class="column items-center justify-center">
      <div class="text-subtitle1">{{data.nombre_necesidad}}</div>
      </div>
      <div class="q-pa-sm" style="width: 100%; max-width: 400px">
        <q-chat-message
          :label="date"
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
      request: {},
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
              this.request = { ...v.data_request }
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
  }
}
</script>
