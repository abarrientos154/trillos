<template>
  <div style="heigth:100%">
      <q-carousel class="full-height" animated v-model="slide" infinite ref="carousel">
        <q-carousel-slide :name="1" class="q-pa-none">
          <div class="row justify-between items-center">
            <q-btn round dense flat class="q-mt-xs q-ml-xs" icon="close" color="primary" @click="finish()"/>
            <div class="q-mt-xs q-mr-xs">Fecha de Solicitud {{data.fechaCreacion}}</div>
          </div>
          <div class="column items-center justify-center">
            <div class="text-center text-white q-mt-sm text-h5" :class="`bg-${data.colorRadio}`" style="width:100%">{{data.name}}</div>
          </div>
          <div class="row items-center q-pt-lg">
            <div class="col-5 row justify-center">
              <q-avatar v-if="data.creador._id" size="100px">
                <img :src="profile + 'perfil' + data.creador._id">
              </q-avatar>
            </div>
            <div class="col-7">
              <div class="row items-center no-wrap">
                <q-icon size="sm" name="person" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{data.creador.full_name}} {{data.creador.last_name}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="clean_hands" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{data.categorianame.name}}</div>
              </div>
            </div>
          </div>
          <div class="row justify-around items-center q-pt-md q-mb-md">
            <div class="text-subtitle1 text-grey-9">Urgencia requerimiento</div>
            <div class="row">
              <q-radio disable v-model="data.colorRadio" keep-color size="xs" val="red" color="red" />
              <q-radio disable v-model="data.colorRadio" keep-color size="xs" val="blue" color="blue" />
            </div>
          </div>
          <div class="q-ml-md text-h6 text-bold q-mt-md">Descripcion del servicio</div>
          <div class="row q-mb-lg" style="height:60px">
            <div class="col-12 q-px-md text-grey-9 ellipsis-3-lines">{{data.descripcion}}</div>
          </div>
          <div class="q-ml-md text-h6 text-bold q-mt-md">Fotos del automovil</div>
          <q-scroll-area
            horizontal
            style="height: 110px;"
            class="q-ml-md"
          >
            <div class="row no-wrap" style="width: 100%">
              <q-card v-for="(img, index) in data.images" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index" @click="imgSelec = baseu + img, showImg = true">
                <q-img :src="!data.images ? 'noimgpro.png' : baseu + img" spinner-color="white" style="height: 100px; width: 100px" />
              </q-card>
            </div>
          </q-scroll-area>
          <div v-if="data.isQuoted != true" class="row justify-center q-pa-sm q-mt-md">
            <q-btn rounded  color="primary" label="Cotizar" no-caps style="width:200px" @click="next()"/>
          </div>
          <div v-else class="row justify-center q-pa-sm q-mt-md">
            <q-btn rounded  color="primary" label="Editar" no-caps style="width:90px" @click="getQuotationById(data.chat)" class="q-mr-sm"/>
            <q-btn rounded  color="primary" label="Cancelar" no-caps style="width:90px" @click="changeStatus(data.chat)"/>
            <div class="text-subtitle1">¡Tu cotización ya fue enviada!</div>
            <div class="text-caption q-mb-xs">Puedes seguir contactando desde el chat</div>
            <q-btn rounded  color="primary" label="Ir al Chat" no-caps style="width:200px" @click="$router.push('chat/' + data.chat)"/>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="q-pa-none">
          <div class="row justify-between items-center">
            <q-btn round dense flat class="q-mt-xs q-ml-xs" icon="close" color="primary" @click="finish()"/>
            <div class="q-mt-xs q-mr-xs">Fecha de Solicitud {{data.fechaCreacion}}</div>
          </div>
          <div class="column items-center justify-center">
            <div class="text-center text-white q-mt-sm text-h5" :class="`bg-${data.colorRadio}`" style="width:100%">{{data.name}}</div>
          </div>
          <div class="text-center text-h6 text-bold q-mt-md">Descripcion del servicio</div>
          <div class="row q-mb-lg" style="height:60px">
            <div class="col-12 q-px-md text-center text-grey-9 ellipsis-3-lines">{{data.descripcion}}</div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="text-subtitle1 q-ml-md">Envia un mensaje de Contacto</div>
            <q-input class="q-mx-md" filled v-model="form.message" type="textarea" :error="$v.form.message.$error" error-message="Este campo es requerido" @blur="$v.form.message.$touch()"/>
          </div>
          <div class="row justify-around items-center">
            <div>
              <div class="text-bold">Fecha estimada</div>
              <div class="text-bold">de atención</div>
            </div>
            <q-input class="col-5" ss filled readonly dense v-model="form.date" placeholder="dd/mm/aaaa" @click="$refs.qDateProxy.show()"
            error-message="Este campo es requerido" :error="$v.form.date.$error" @blur="$v.form.date.$touch()">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.date" mask="DD/MM/YYYY" :options="optionsFn2">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Cerrar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row justify-around items-center">
            <div class="text-bold">Coste estimado</div>
            <q-input type="number" class="col-5" prefix="$" :min="0" filled dense v-model="form.price" error-message="Este campo es requerido" :error="$v.form.price.$error" @blur="$v.form.price.$touch()">
            </q-input>
          </div>
          <div class="row justify-center q-pa-sm q-mt-md">
            <q-btn rounded  color="primary" :label="edit === true ?  'Actualizar' : 'Enviar'" no-caps style="width:200px" @click="edit === true ? updateQuotation() : setQuotation()"/>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="q-px-none column items-center">
          <div class="absolute-center column items-center q-px-md" style="width:100%">
            <div class="q-mt-xl" style="height: 200px; width: 70%;">
              <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
              <div class="absolute-full column items-center column justify-end">
                <q-icon name="collections" class="text-grey" size="80px"></q-icon>
                <div class="text-bold text-center text-grey">{{edit === true ? 'Presupuesto actualizado con éxito' : 'Presupuesto enviado con éxito'}}</div>
              </div>
              </q-img>
            </div>
            <div class="text-h6 text-center text-bold q-mt-xl">{{edit === true ? '¡Tu mensaje fue Actualizado con éxito!' : '¡Tu mensaje fue enviado con éxito!'}}</div>
            <div class="text-h6 text-center text-grey-9 text-subtitle1">Podrás ver el estado de tu solicitud en tu panel de administración de solicitudes.</div>
            <div class="q-pa-sm q-mt-md q-mb-xl">
              <q-btn rounded  color="primary" label="Inicio" no-caps style="width:200px" @click="finish()"/>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="q-px-none column items-center">
          <div class="absolute-center column items-center q-px-md" style="width:100%">
            <div class="q-mt-xl" style="height: 200px; width: 70%;">
              <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
              <div class="absolute-full column items-center column justify-end">
                <q-icon name="collections" class="text-grey" size="80px"></q-icon>
                <div class="text-bold text-center text-grey">Tu cotización fue cancelada con éxito</div>
              </div>
              </q-img>
            </div>
            <div class="text-h6 text-center text-bold q-mt-xl">¡Tu cotización se ha cancelado con éxito!</div>
            <div class="text-h6 text-center text-grey-9 text-subtitle1">El cliente ya no vera tu cotización.</div>
            <div class="q-pa-sm q-mt-md q-mb-xl">
              <q-btn rounded  color="primary" label="Inicio" no-caps style="width:200px" @click="finish()"/>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>

    <q-dialog v-model="showImg">
      <q-card>
        <img :src="imgSelec" spinner-color="white" style="height: 100%; width: 100%" />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import env from '../env'
import moment from 'moment'
import { required } from 'vuelidate/lib/validators'
export default {
  props: ['data', 'profile'],
  data () {
    return {
      baseu: '',
      imgSelec: '',
      showImg: false,
      slide: 1,
      form: {},
      edit: false
    }
  },
  mounted () {
    this.baseu = env.apiUrl + '/necesidad_img/'
  },
  validations: {
    form: {
      message: { required },
      date: { required },
      price: { required }
    }
  },
  methods: {
    next () {
      this.slide = 2
    },
    async setQuotation () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Subiendo Cotización, Por Favor Espere...'
        })
        this.form.request_id = this.data._id
        this.form.client_id = this.data.creador._id
        this.form.name = this.data.name
        await this.$api.post('quotation', this.form).then(res => {
          if (res) {
            this.$q.loading.hide()
            this.slide = 3
          }
        })
      }
    },
    async updateQuotation () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Actualizando Cotización, Por Favor Espere...'
        })
        await this.$api.put('editQuotation/' + this.form._id, this.form).then(res => {
          if (res) {
            this.$q.loading.hide()
            this.slide = 3
          }
        })
      }
    },
    finish () {
      this.$emit('close', true)
      this.edit = false
      this.form = {}
    },
    optionsFn2 (datee) {
      var dd = moment().format('YYYY/MM/DD')
      const formattedString = moment(datee).format('YYYY/MM/DD')
      return formattedString >= dd
    },
    changeStatus (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas cancelar tu cotización a esta solicitud?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.loading.show({
          message: 'Cancelando cotización...'
        })
        this.$api.put('updateQuotation/' + id, { status: 3 }).then(res => {
          if (res) {
            this.$q.loading.hide()
            this.slide = 4
            this.verSolicitud = false
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    getQuotationById (id) {
      this.$api.get('getQuotationById/' + id).then(res => {
        if (res) {
          this.slide = 2
          this.form = { ...res }
          this.edit = true
        }
      })
    }
  }
}
</script>
