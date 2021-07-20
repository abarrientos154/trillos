<template>
  <div>
    <!-- <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-bottom-right-radius: 20px; border-bottom-left-radius: 20px"/> -->
    <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-bottom-right-radius: 20px; border-bottom-left-radius: 20px">
      <div class="absolute-full column items-center column justify-end">
        <q-icon name="collections" class="text-grey" size="80px"></q-icon>
        <div class="text-bold text-center text-grey">Conversaciones iniciadas</div>
      </div>
    </q-img>
    <div class="q-ma-md text-h6">Conversaciones iniciadas</div>
    <!-- <q-separator inset /> -->
    <!-- <div v-if="data.length > 0" class="q-pr-md q-pt-sm text-subtitle2 text-right text-grey-8"><u>Tienes {{ data.length }} Mensajes</u></div> -->

    <div v-if="data.length > 0 && data[0].data_supplier" class="col-12 q-pa-md">
        <q-card v-for="(chat, index) in data" :key="index">
            <div class="row items-center absolute-bottom-right q-ma-sm">
              <q-btn :color="chat.viewed === false ? 'orange' : 'primary'" label="Ver cotización" no-caps style="width:122px" class="q-mr-sm" @click="showQuotation(chat)"/>
              <div>
                <div class="text-bold">Servicios del Taller</div>
                <q-avatar square size="30px" v-for="(item, index) in chat.services" :key="index">
                  <img :src="item.icons">
                </q-avatar>
              </div>
            </div>
            <div @click="$router.push('/chat/' + chat._id)">
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
            </div>
            </div>
        </q-card>
    </div>
    <div v-if="data.length > 0 && data[0].data_client" class="col-12 q-pa-md">
        <q-card v-for="(chat, index) in data" :key="index">
            <div class="row items-center absolute-bottom-right q-ma-sm">
              <q-btn :color="chat.viewed === false ? 'orange' : 'primary'" label="Ver Solicitud" no-caps style="width:122px" class="q-mr-sm" @click="showRequest(chat)"/>
            </div>
            <div @click="$router.push('/chat/' + chat._id)">
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
                  <div class="text-white text-h6">{{rol === 3 ? chat.data_client.full_name : chat.data_client.full_name + ' ' + chat.data_client.last_name}}</div>
                </div>
              </div>
              <div class="row items-center q-pt-sm q-pb-xl">
                <div class="col-5 row justify-center">
                  <q-avatar size="100px">
                    <img :src="chat.data_client._id.length > 0 ? baseu + chat.data_client._id : 'noimgpro.png'">
                  </q-avatar>
                </div>
                <div class="col-7">
                  <div class="row q-mt-sm items-center no-wrap">
                    <q-icon size="sm" name="place" color="grey-7" />
                    <div class="text-grey-9 ellipsis">{{chat.country}} / {{chat.city}}</div>
                  </div>
                  <div class="row q-mt-sm items-center no-wrap">
                    <q-icon size="sm" name="store_mall_directory" color="grey-7" />
                    <div class="text-grey-9 ellipsis">{{chat.data_request.direccion}}</div>
                  </div>
              </div>
              </div>
            </div>
        </q-card>
    </div>
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
            <q-btn v-if="data2.status == 0 && item.status == 0" rounded  color="primary" label="Aceptar" no-caps style="width:200px" @click="acceptQuotation(data2._id)"/>
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
          <div class="absolute-top-right q-pr-sm">Fecha de Solicitud {{request2.creationDate}}</div>
          <div class="column items-center justify-center">
            <div class="text-center text-white q-mt-lg text-h5" :class="`bg-${request2.colorRadio}`" style="width:100%">{{request2.name}}</div>
          </div>
          <div class="row items-center q-pt-lg">
            <div class="col-5 row justify-center">
              <q-avatar size="100px">
                <img :src="baseu + clientData._id">
              </q-avatar>
            </div>
            <div class="col-7">
              <div class="row items-center no-wrap">
                <q-icon size="sm" name="person" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{clientData.full_name}} {{clientData.last_name}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="phone" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{clientData.phone}}</div>
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
            <q-select class="q-mx-md q-mt-sm" color="grey" filled option-label="name" option-value="value" emit-value map-options v-model="form.status" :options="options" label="Estado de la solicitud" dense :error="$v.form.status.$error" error-message="Este campo es requerido" @blur="$v.form.status.$touch()" @input="extend(form.status)">
            </q-select>
            <div v-if="extension == true">
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
          <div v-if="request2.status === 1" class="row justify-center q-pa-sm q-mt-md">
            <q-btn rounded  color="primary" label="Cambiar estado" no-caps style="width:200px" @click="change == false ? activeChange() : changeStatus()"/>
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
    <!-- <div v-if="data.length > 0" class="q-pa-md q-gutter-md">
        <q-card class="bordes row" @click="$router.push('/chat/' + chat._id)" v-for="(chat, index) in data" :key="index">
            <div class="col-3">
              <q-avatar class="q-pl-sm" size="60px">
                <q-img :src="chat.data_request.images.length > 0 ? baseu + chat.data_request.images[0] : 'noimgpro.png'" />
              </q-avatar>
              <div class="text-center text-grey text-bold text-caption q-pb-xs">{{chat.status !== 'Presupuesto' ? chat.status : 'Pendiente'}}</div>
            </div>
            <div class="col-9">
              <div class="text-black text-bold text-subtitle1 q-pt-sm">{{rol === 2 ? chat.data_supplier.full_name : chat.data_client.full_name + ' ' + chat.data_client.last_name}}</div>
              <div class="row">
              <div class="text-caption">{{chat.data_request.name}}</div>
              </div>
              <div class="text-caption q-px-sm">{{chat.last_message}}</div>
              <div class="absolute-bottom text-amber-8 text-subtitle1 text-right q-pr-sm">{{chat.created_at_message}}</div>
            </div>
        </q-card>
    </div>

    <q-card v-else class="shadow-2 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Actualmente sin chats...</div>
    </q-card> -->
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import env from '../env'
export default {
  data () {
    return {
      idQuotation: '',
      imgSelec: '',
      showImg: false,
      baseu: '',
      baseu2: '',
      ratingProduc: 3,
      ver: true,
      show: false,
      show2: false,
      data: [],
      data2: {},
      id: '',
      request: [],
      request2: {},
      slide: 1,
      slide2: 1,
      clientData: {},
      categoryName: '',
      change: false,
      form: {},
      options: [
        { name: 'En progreso', value: 1 },
        { name: 'Finalizado', value: 2 }
      ],
      extension: false,
      extensionDate: ''
    }
  },
  validations: {
    form: {
      status: { required }
    },
    extensionDate: { required }
  },
  mounted () {
    this.getRecords()
    this.baseu = env.apiUrl + '/perfil_img/perfil'
    this.baseu2 = env.apiUrl + '/necesidad_img/'
  },
  methods: {
    getRecords () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          /* if (this.rol === 3 && (v.status === 0 || v.status === 2)) {
            this.ver = false
          } */
          if (this.ver) {
            this.$api.get('show_all_chats').then(res => {
              if (res) {
                this.data = res
                console.log('this.data :>> ', this.data)
              }
            })
          }
        }
      })
    },
    showQuotation (data) {
      this.request.push(data.data_request)
      this.data2 = {
        _id: data._id,
        message: data.message,
        date: data.date,
        price: data.price,
        status: data.status
      }
      this.show = true
    },
    showRequest (data) {
      console.log('data >> ', data)
      this.idQuotation = data._id
      this.request2 = data.data_request
      this.categoryName = this.request2.categorianame.name
      this.clientData = data.data_client
      this.show2 = true
    },
    async acceptQuotation (id) {
      console.log('id :>> ', id)
      await this.$api.put('updateQuotation/' + id).then(res => {
        if (res) {
          this.slide = 2
        }
      })
    },
    activeChange () {
      if (!this.change) {
        this.change = true
      }
    },
    async changeStatus () {
      this.$v.form.$touch()
      if (this.form.status === 1) {
        this.$v.extensionDate.$touch()
        if (!this.$v.extensionDate.$error) {
          this.form.date = this.extensionDate
        }
      }
      if (!this.$v.form.$error) {
        console.log('this.form :>> ', this.form)
        console.log('this.id :>> ', this.id)
        await this.$api.put('updateQuotation/' + this.idQuotation, this.form).then(res => {
          if (res) {
            this.slide2 = 2
          }
        })
      }
    },
    extend (value) {
      console.log('value :>> ', value)
      if (value === 1) {
        this.extension = true
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

<style scoped lang="scss">
.bordes {
  border-left: 6px solid $primary;
  background-color: rgba(202, 202, 202, 0.474);
  border-radius: 12px;
}
</style>
