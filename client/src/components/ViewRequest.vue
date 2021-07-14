<template>
  <div>
    <q-card>
      <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
        <q-carousel-slide :name="1" class="q-pa-none">
          <div class="absolute-top-right q-pr-sm">Fecha de Solicitud {{data.fechaCreacion}}</div>
          <div class="column items-center justify-center">
            <div class="text-center text-white q-mt-lg text-h5" :class="`bg-${data.colorRadio}`" style="width:100%">{{data.name}}</div>
          </div>
          <div class="row items-center q-pt-lg">
            <div class="col-5 row justify-center">
              <q-avatar size="100px">
                <img :src="profile + 'perfil' + data.creador._id">
              </q-avatar>
            </div>
            <div class="col-7">
              <div class="row items-center no-wrap">
                <q-icon size="sm" name="person" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{data.creador.full_name}} {{data.creador.last_name}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="phone" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{data.creador.phone}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="place" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{data.direccion}}</div>
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
              <q-radio v-model="data.colorRadio" keep-color size="xs" val="red" color="red" />
              <q-radio v-model="data.colorRadio" keep-color size="xs" val="orange" color="orange" />
              <q-radio v-model="data.colorRadio" keep-color size="xs" val="blue" color="blue" />
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
                <q-img :src="data.images ? baseu + img : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
              </q-card>
            </div>
          </q-scroll-area>
          <div class="row justify-center q-pa-sm q-mt-md">
            <q-btn rounded  color="primary" label="Contactar" no-caps style="width:200px" @click="next()"/>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="q-pa-none">
          <div class="absolute-top-right q-pr-sm">Fecha de Solicitud {{data.fechaCreacion}}</div>
          <div class="column items-center justify-center">
            <div class="text-center text-white q-mt-lg text-h5" :class="`bg-${data.colorRadio}`" style="width:100%">{{data.name}}</div>
          </div>
          <div class="text-center text-h6 text-bold q-mt-md">Descripcion del servicio</div>
          <div class="row q-mb-lg" style="height:60px">
            <div class="col-12 q-px-md text-center text-grey-9 ellipsis-3-lines">{{data.descripcion}}</div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="text-subtitle1 q-ml-md">Envia un mensaje de Contacto</div>
            <q-input class="q-mx-md" filled v-model="form.message" type="textarea" :error="$v.form.message.$error" error-message="Este campo es requerido" @blur="$v.form.message.$touch()"/>
          </div>
          <div class="row col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="text-bold">Fecha de termino</div>
            <q-input filled readonly dense v-model="form.date" placeholder="dd/mm/aaaa" @click="$refs.qDateProxy.show()"
            error-message="Este campo es requerido" :error="$v.form.date.$error" @blur="$v.form.date.$touch()">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.date" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Cerrar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="text-bold">Coste estimado</div>
            <q-input type="number" :min="0" filled dense v-model="form.price" error-message="Este campo es requerido" :error="$v.form.price.$error" @blur="$v.form.price.$touch()">
            </q-input>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-card>
    <q-dialog v-model="showImg">
      <q-card>
        <img :src="imgSelec" spinner-color="white" style="height: 100%; width: 100%" />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import env from '../env'
import { required } from 'vuelidate/lib/validators'
export default {
  props: ['data', 'profile'],
  data () {
    return {
      baseu: '',
      imgSelec: '',
      showImg: false,
      slide: 1,
      form: {}
    }
  },
  mounted () {
    this.baseu = env.apiUrl + '/necesidad_img/'
    console.log('this.data :>> ', this.data)
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
    }
  }
}
</script>
