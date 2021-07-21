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
    <q-btn round dense flat icon="keyboard_backspace" color="primary" @click="$router.go(-1)"/>
    <div class="text-h6 text-bold text-center q-mt-sm">Toca la tarjeta para ver</div>
    <div class="text-subtitle2 text-center q-mb-sm">Selecciona la tarjeta de solicitud para aceptar la propuesta</div>

    <div class="col-12 q-pa-md" v-for="(item, index) in mapeando" :key="index">
      <q-card class="shadow-8" v-if="rol === 3" @click="showRequest(item)">
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
      <q-card class="shadow-8" v-if="rol === 2" @click="show = true">
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
      <q-dialog v-model="show" transition-show="slide-up" transition-hide="slide-down" >
        <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
          <q-carousel-slide :name="1" class="q-pa-none" v-for="(item, index) in mapeando" :key="index">
            <div class="absolute-top-right q-pr-sm">Fecha de Solicitud {{item.creationDate}}</div>
            <div class="column items-center justify-center">
              <div class="text-center text-white q-mt-lg text-h5" :class="`bg-${item.colorRadio}`" style="width:100%">{{item.name}}</div>
            </div>
            <div class="text-center text-h6 text-bold q-mt-md">Descripcion del servicio</div>
            <div class="row q-mb-lg" style="height:60px">
              <div class="col-12 q-px-md text-center text-grey-9 ellipsis-3-lines">{{item.descripcion}}</div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="text-subtitle1 q-ml-md">Mensaje de Contacto</div>
              <q-input class="q-mx-md" readonly filled v-model="data2.message" type="textarea"/>
            </div>
            <div class="row justify-around items-center">
              <div class="text-bold">Fecha de termino</div>
              <q-input class="col-5" ss filled readonly dense v-model="data2.date" placeholder="dd/mm/aaaa">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="row justify-around items-center">
              <div class="text-bold">Coste estimado</div>
              <q-input type="number" class="col-5" prefix="$" readonly filled dense v-model="data2.price">
              </q-input>
            </div>
            <div class="row justify-center q-pa-sm q-mt-md">
              <q-btn v-if="data2.status == 0 && item.status == 0" rounded  color="primary" label="Aceptar" no-caps style="width:200px" @click="acceptQuotation()"/>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="q-pa-none column items-center">
          <div class="q-mt-xl" style="height: 200px; width: 70%;">
            <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
            <div class="absolute-full column items-center column justify-end">
              <q-icon name="collections" class="text-grey" size="80px"></q-icon>
              <div class="text-bold text-center text-grey">Presupuesto Aceptado</div>
            </div>
            </q-img>
          </div>
          <div class="text-h6 text-center text-bold q-mt-xl">¡Cambiaste con éxito el estado!</div>
          <div class="text-h6 text-center text-grey-9 text-subtitle1">Podrás ver el estado de tu solicitud en tu panel de administración de solicitudes.</div>
          <div class="q-pa-sm q-mt-md">
            <q-btn rounded  color="primary" label="Volver" no-caps style="width:200px" @click="show = false, slide = 1"/>
          </div>
        </q-carousel-slide>
        </q-carousel>
      </q-dialog>
      <q-dialog v-model="show2" transition-show="slide-up" transition-hide="slide-down">
        <q-carousel class="window-height" animated v-model="slide2" infinite ref="carousel">
          <q-carousel-slide :name="1" class="q-pa-none">
            <div class="text-right q-mt-xs q-mr-sm">Fecha de Solicitud {{request2.creationDate}}</div>
            <div class="column items-center justify-center">
              <div class="text-center text-white q-mt-xs text-h5" :class="`bg-${request2.colorRadio}`" style="width:100%">{{request2.name}}</div>
            </div>
            <div class="row items-center q-pt-lg">
              <div class="col-5 row justify-center">
                <q-avatar size="100px">
                  <img :src="baseu + request2.ownerId">
                </q-avatar>
              </div>
              <div class="col-7">
                <div class="row items-center no-wrap">
                  <q-icon size="sm" name="person" color="grey-7" />
                  <div class="text-grey-9 ellipsis">{{request2.fullName}}</div>
                </div>
                <div class="row q-mt-sm items-center no-wrap">
                  <q-icon size="sm" name="place" color="grey-7" />
                  <div class="text-grey-9 ellipsis">{{request2.direccion}}</div>
                </div>
                <div class="row q-mt-sm items-center no-wrap">
                  <q-icon size="sm" name="clean_hands" color="grey-7" />
                  <div class="text-grey-9 ellipsis">{{categoryName}}</div>
                </div>
              </div>
            </div>
            <div class="row justify-around items-center q-pt-md q-mb-md">
              <div class="text-subtitle1 text-grey-9">Urgencia requerimiento</div>
              <div class="row">
                <q-radio v-model="request2.colorRadio" keep-color size="xs" val="red" color="red" />
                <q-radio v-model="request2.colorRadio" keep-color size="xs" val="orange" color="orange" />
                <q-radio v-model="request2.colorRadio" keep-color size="xs" val="blue" color="blue" />
              </div>
            </div>
            <div class="q-ml-md text-h6 text-bold q-mt-md">Descripcion del servicio</div>
            <div class="row q-mb-lg" style="height:60px">
              <div class="col-12 q-px-md text-grey-9 ellipsis-3-lines">{{request2.descripcion}}</div>
            </div>
            <div class="q-ml-md text-h6 text-bold q-mt-md">Fotos del automovil</div>
            <q-scroll-area
              horizontal
              style="height: 110px;"
              class="q-ml-md"
            >
              <div class="row no-wrap" style="width: 100%">
                <q-card v-for="(img, index) in request2.images" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index" @click="imgSelec = baseu2 + img, showImg = true">
                  <q-img :src="request2.images ? baseu2 + img : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
                </q-card>
              </div>
            </q-scroll-area>
            <div v-if="change">
              <div class="q-ml-md text-h6 text-bold q-mt-md">Cambio de estado</div>
              <div class="q-mx-md q-mt-md">Cambia el estado de tarjeta de solicitud. Así podrás tener un control mas claro de tu trato con el cliente. Recuerda que una vez que des el trabajo por finalizado el cliente podra cambiar el estado del servicio a finalizado.</div>
              <div class="row justify-center q-mt-sm">
                <q-btn-group>
                  <q-btn v-for="(btn, index) in btnG" :key="index" no-caps :class="btn.selected ? 'text-white' : 'text-black'" :color="btn.selected == true ? 'primary' : 'white'" :label="btn.name" @click="selectOption(btn)"/>
                </q-btn-group>
              </div>
              <div v-if="finish == true">
                <div class="q-mx-md q-mt-md">Una vez finalizado el servicio no podrás volver atrás.</div>
              </div>
              <div v-if="extension == true" class="q-mt-md">
                <q-input class="q-mx-md" ss filled readonly dense v-model="extensionDate" placeholder="dd/mm/aaaa" @click="$refs.qDateProxy.show()"
                error-message="Este campo es requerido" :error="$v.extensionDate.$error" @blur="$v.extensionDate.$touch()">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="extensionDate" mask="DD/MM/YYYY">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div v-if="request2.status === 1" class="row justify-center q-pa-sm q-mt-sm">
              <q-btn rounded  color="primary" :label="finish == false && extension == false ? 'Cambiar estado': finish == true ? 'Finalizar' : 'Prorrogar fecha'" no-caps style="width:200px" @click="change == false ? activeChange() : changeStatus()"/>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="q-pa-none column items-center">
            <div class="q-mt-xl" style="height: 200px; width: 70%;">
              <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
              <div class="absolute-full column items-center column justify-end">
                <q-icon name="collections" class="text-grey" size="80px"></q-icon>
                <div class="text-bold text-center text-grey">Cambio realizado</div>
              </div>
              </q-img>
            </div>
            <div class="text-h6 text-center text-bold q-mt-xl">¡Cambiaste con éxito el estado!</div>
            <div class="text-h6 text-center text-grey-9 text-subtitle1">Podrás ver el estado de tu solicitud en tu panel de administración de solicitudes.</div>
            <div class="q-pa-sm q-mt-md">
              <q-btn rounded  color="primary" label="Volver" no-caps style="width:200px" @click="$router.push('/inicio_proveedor')"/>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-dialog>
      <q-dialog v-model="showImg">
        <q-card>
          <img :src="imgSelec" spinner-color="white" style="height: 100%; width: 100%" />
        </q-card>
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
import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    EnviarCotizacion
  },
  data () {
    return {
      id: this.$route.params.id,
      text: '',
      imgSelec: '',
      showImg: false,
      baseu: '',
      baseu2: '',
      request2: {},
      clientData: {},
      categoryName: '',
      request: [],
      rol: 0,
      data2: {},
      cotizarBtn: false,
      cotizar: false,
      verCotizacion: false,
      presupuesto: false,
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
      supplierId: '',
      show: false,
      show2: false,
      slide: 1,
      slide2: 1,
      change: false,
      form: {},
      extension: false,
      extensionDate: null,
      finish: false,
      btnG: [
        { name: 'Cambiar fecha', selected: false, value: 1 },
        { name: 'Finalizar', selected: false, value: 2 }
      ]
    }
  },
  validations: {
    form: {
      status: { required }
    },
    extensionDate: { required }
  },
  mounted () {
    this.getinfo()
    this.baseu = env.apiUrl + '/perfil_img/perfil'
    this.baseu2 = env.apiUrl + '/necesidad_img/'
  },
  methods: {
    async getinfo () {
      await this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          this.$api.get('show_all_messages/' + this.id).then(v => {
            if (v) {
              this.request.push(v.data_request)
              this.clientId = v.datos_cliente
              this.supplierId = v.datos_proveedor
              this.data2 = {
                _id: v._id,
                message: v.message,
                date: v.date,
                price: v.price,
                status: v.status
              }
              console.log('this.data2 :>> ', this.data2)
              this.data = v
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
    },
    async acceptQuotation () {
      await this.$api.put('updateQuotation/' + this.id).then(res => {
        if (res) {
          this.slide = 2
        }
      })
    },
    showRequest (data) {
      console.log('data :>> ', data)
      this.request2 = data
      this.categoryName = this.request2.categoryName
      this.clientData = data.data_client
      this.show2 = true
    },
    activeChange () {
      if (!this.change) {
        this.change = true
      }
    },
    async changeStatus () {
      console.log('this.form :>> ', this.form)
      this.$v.form.$touch()
      if (this.form.status === 1) {
        this.$v.extensionDate.$touch()
        if (!this.$v.extensionDate.$error) {
          this.form.date = this.extensionDate
        }
        if (!this.$v.form.$error && !this.$v.extensionDate.$error) {
          console.log('this.form :>> ', this.form)
          console.log('this.id :>> ', this.id)
          await this.$api.put('updateQuotation/' + this.id, this.form).then(res => {
            if (res) {
              this.slide2 = 2
            }
          })
        }
      }
      if (this.form.status === 2) {
        if (!this.$v.form.$error) {
          console.log('this.form :>> ', this.form)
          console.log('this.id :>> ', this.id)
          await this.$api.put('updateQuotation/' + this.id, this.form).then(res => {
            if (res) {
              this.slide2 = 2
            }
          })
        }
      }
    },
    selectOption (btn) {
      if (btn.value === 1) {
        this.btnG[1].selected = false
        this.btnG[0].selected = true
        this.form.status = 1
        this.extension = true
        this.finish = false
      } else if (btn.value === 2) {
        this.btnG[1].selected = true
        this.btnG[0].selected = false
        this.form.status = 2
        this.finish = true
        this.extension = false
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
