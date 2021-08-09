<template>
  <div>
    <div>
      <q-img src="nopublicidad.jpg" spinner-color="white" style="width:100%; height:160px">
        <div class="text-h6 absolute-bottom text-center bg-transparent">Solicitudes</div>
      </q-img>
    </div>

    <div class="q-pa-md">
      <div class="text-h6">Solicitudes en tu zona</div>
      <div class="column items-center" v-if="solicitudes.length">
        <q-card class="q-mb-md" v-for="(item, index) in solicitudes" :key="index" style="width:100%;height:270px;" @click="selecData(item)">
            <div class="row justify-end items-center q-pa-xs">
              <div class="text-caption text-grey-8 q-pr-xs">Nivel de requerimiento</div>
              <div class="row q-gutter-xs">
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="red" color="red" />
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="orange" color="orange" />
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="blue" color="blue" />
              </div>
            </div>
            <div :class="'text-white q-py-xs q-px-md text-right text-bold bg-'+item.colorRadio" style="widyh:100%">{{item.name}}</div>
            <div class="row q-py-sm">
              <div class="column items-center justify-center" style="width:40%">
                <q-avatar size="90px">
                  <img :src="baseu + '/' + item.images[0]" spinner-color="white">
                </q-avatar>
                <div class="q-pl-sm q-mt-xs" style="width:100%">
                  <div class="row items-center">
                    <q-icon size="xs" name="person" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.full_name}} {{item.creador.last_name}}</div>
                  </div>
                  <div class="row q-mt-sm items-center">
                    <q-icon size="xs" name="place" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.direccion}}</div>
                  </div>
                </div>
              </div>
              <div style="width:60%">
                <div class="text-h6 q-mb-xs">Descripción</div>
                <div class="row q-mb-md" style="height:50px; width:100%">
                  <div class="col-12 q-px-md text-grey-9 ellipsis-3-lines">{{item.descripcion}}</div>
                </div>
                <div class="row items-center">
                  <div class="text-caption text-grey-9 ellipsis"><b>Estado de solicitud:</b> {{item.status === 0 ? 'Disponible' : item.status === 1 ? 'En Progreso' : 'Finalizado'}}</div>
                </div>
                <div class="row items-center no-wrap q-mt-xs" style="width:100%">
                  <img :src="item.categorianame.icons" style="width:18px" />
                  <div class="text-grey-8 q-pl-xs ellipsis">{{item.categorianame.name}}</div>
                </div>
              </div>
            </div>
            <div class="absolute-bottom-right text-grey-8 q-pa-sm text-caption">Fecha de Solicitud: {{item.fechaCreacion}} </div>
          </q-card>
      </div>
      <q-card v-else class="shadow-2 q-ma-md q-pa-md">
        <div class="text-center text-subtitle1">Actualmente sin solicitudes...</div>
      </q-card>
    </div>
    <div v-if="allSolicitudes.length > 3" class="row justify-center q-py-md">
      <q-btn rounded no-caps :label="!ver3 ? 'Ver más' : 'Ver menos'" color="primary" style="width:200px"
      @click="verMas(3)" />
    </div>

    <div class="q-pa-md">
      <div class="text-h6">Solicitudes activas</div>
      <div class="text-caption text-grey-9 q-pb-md">A continuación podrás ver todas las solicitudes activas.</div>
      <div class="column items-center" v-if="activas.length">
        <q-card class="q-mb-md" v-for="(item, index) in activas" :key="index" style="width:100%;height:270px;" @click="selecData(item)">
            <div class="row justify-end items-center q-pa-xs">
              <div class="text-caption text-grey-8 q-pr-xs">Nivel de requerimiento</div>
              <div class="row q-gutter-xs">
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="red" color="red" />
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="orange" color="orange" />
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="blue" color="blue" />
              </div>
            </div>
            <div :class="'text-white q-py-xs q-px-md text-right text-bold bg-'+item.colorRadio" style="widyh:100%">{{item.necesidad ? item.necesidad.name : ''}}</div>
            <div class="row q-py-sm">
              <div class="column items-center justify-center" style="width:40%">
                <q-avatar size="90px">
                  <img :src="item.necesidad ? baseu + '/' + item.necesidad.images[0] : 'noimgpro.png'" spinner-color="white">
                </q-avatar>
                <div class="q-pl-sm q-mt-xs" style="width:100%">
                  <div class="row items-center">
                    <q-icon size="xs" name="person" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.full_name}} {{item.creador.last_name}}</div>
                  </div>
                  <div class="row q-mt-sm items-center">
                    <q-icon size="xs" name="place" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.direccion}}</div>
                  </div>
                </div>
              </div>
              <div style="width:60%">
                <div class="text-h6 q-mb-xs">Descripción</div>
                <div class="row q-mb-md" style="height:50px; width:100%">
                  <div class="col-12 q-pr-xs text-grey-9 text-caption ellipsis-3-lines">{{item.necesidad ? item.necesidad.descripcion : ''}}</div>
                </div>
                <div class="row items-center">
                  <div class="text-caption text-grey-9 ellipsis"><b>Estado de solicitud:</b> {{item.status === 0 ? 'Disponible' : 'En Progreso'}}</div>
                </div>
                <div class="row items-center no-wrap q-mt-xs" style="width:100%">
                  <img :src="item.categoriaInfo.icons" style="width:18px" />
                  <div class="text-grey-8 q-pl-xs ellipsis">{{item.categoriaInfo.name}}</div>
                </div>
              </div>
            </div>
            <div class="absolute-bottom-right text-grey-8 q-pa-sm text-caption">Fecha de Solicitud: {{item.fechaCreacion}} </div>
          </q-card>
      </div>
      <q-card v-else class="shadow-2 q-ma-md q-pa-md">
        <div class="text-center text-subtitle1">Actualmente sin solicitudes...</div>
      </q-card>
    </div>
    <div v-if="allActivas.length > 3" class="row justify-center q-py-md">
      <q-btn rounded no-caps :label="!ver1 ? 'Ver más' : 'Ver menos'" color="primary" style="width:200px"
      @click="verMas(1)" />
    </div>

    <div class="q-pa-md">
      <div class="text-h6">Solicitudes completadas</div>
      <div class="text-caption text-grey-9 q-pb-md">Historial de solicitudes realizadas y completadas con éxito.</div>
      <div class="column items-center" v-if="completas.length">
        <q-card class="q-mb-md" v-for="(item, index) in completas" :key="index" style="width:100%;height:270px;" @click="selecData(item)">
            <div class="row justify-end items-center q-pa-xs">
              <div class="text-caption text-grey-8 q-pr-xs">Nivel de requerimiento</div>
              <div class="row q-gutter-xs">
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="red" color="red" />
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="orange" color="orange" />
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="blue" color="blue" />
              </div>
            </div>
            <div :class="'text-white q-py-xs q-px-md text-right text-bold bg-'+item.colorRadio" style="widyh:100%">{{item.necesidad ? item.necesidad.name : ''}}</div>
            <div class="row q-py-sm">
              <div class="column items-center justify-center" style="width:40%">
                <q-avatar size="90px">
                  <img :src="item.necesidad ? baseu + '/' + item.necesidad.images[0] : 'noimgpro.png'" spinner-color="white">
                </q-avatar>
                <div class="q-pl-sm q-mt-xs" style="width:100%">
                  <div class="row items-center">
                    <q-icon size="xs" name="person" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.full_name}} {{item.creador.last_name}}</div>
                  </div>
                  <div class="row q-mt-sm items-center">
                    <q-icon size="xs" name="place" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.direccion}}</div>
                  </div>
                </div>
              </div>
              <div style="width:60%">
                <div class="text-h6 q-mb-xs">Descripción</div>
                <div class="row q-mb-md" style="height:50px; width:100%">
                  <div class="col-12 q-pr-xs text-grey-9 text-caption ellipsis-3-lines">{{item.necesidad ? item.necesidad.descripcion : ''}}</div>
                </div>
                <div class="row items-center">
                  <div class="text-caption text-grey-9 ellipsis"><b>Estado de solicitud:</b> {{'Finalizado'}}</div>
                </div>
                <div class="row items-center no-wrap q-mt-xs" style="width:100%">
                  <img :src="item.categoriaInfo.icons" style="width:18px" />
                  <div class="text-grey-8 q-pl-xs ellipsis">{{item.categoriaInfo.name}}</div>
                </div>
              </div>
            </div>
            <div class="absolute-bottom-right text-grey-8 q-pa-sm text-caption">Fecha de Solicitud: {{item.fechaCreacion}} </div>
          </q-card>
      </div>
      <q-card v-else class="shadow-2 q-ma-md q-pa-md">
        <div class="text-center text-subtitle1">Actualmente sin solicitudes...</div>
      </q-card>
    </div>
    <div v-if="allCompletas.length > 3" class="row justify-center q-py-md">
      <q-btn rounded no-caps :label="!ver2 ? 'Ver más' : 'Ver menos'" color="primary" style="width:200px"
      @click="verMas(2)" />
    </div>

    <q-dialog v-model="verSolicitud" v-if="verSolicitud">
      <q-carousel class="full-height" animated v-model="slide" infinite ref="carousel">
        <q-carousel-slide :name="1" class="q-pa-none">
          <q-card class="q-pt-md q-pb-lg" style="width:100%">
            <div class="text-right q-pb-xs q-mr-xs">Fecha de Solicitud {{selec.fechaCreacion}}</div>
              <div class="text-center text-white text-h5" :class="'bg-' + selec.colorRadio" style="width:100%">{{selec.necesidad ? selec.necesidad.name : selec.name}}</div>
              <div class="row items-center q-pt-lg">
                <div class="col-5 row justify-center">
                  <q-avatar size="100px">
                    <img :src="selec.ownerId ? baseuPerfil + selec.ownerId : baseuPerfil + selec.client_id">
                  </q-avatar>
                </div>
                <div class="col-7">
                  <div class="row items-center no-wrap">
                    <q-icon size="sm" name="person" color="grey-7" />
                    <div class="text-grey-9 ellipsis">{{selec.creador.full_name}} {{selec.creador.last_name}}</div>
                  </div>
                  <div class="row q-mt-sm items-center no-wrap">
                    <q-icon size="sm" name="place" color="grey-7" />
                    <div class="text-grey-9 ellipsis">{{selec.necesidad ? selec.necesidad.direccion : selec.direccion}}</div>
                  </div>
                  <div class="row q-mt-sm items-center no-wrap">
                    <q-icon size="sm" name="clean_hands" color="grey-7" />
                    <div class="text-grey-9 ellipsis">{{selec.categoriaInfo ? selec.categoriaInfo.name : selec.categorianame.name}}</div>
                  </div>
                </div>
              </div>
              <div class="row justify-around items-center q-pt-md q-mb-md">
                <div class="text-subtitle1 text-grey-9">Urgencia requerimiento</div>
                <div class="row">
                  <q-radio v-model="selec.colorRadio" keep-color size="xs" val="red" color="red" />
                  <q-radio v-model="selec.colorRadio" keep-color size="xs" val="orange" color="orange" />
                  <q-radio v-model="selec.colorRadio" keep-color size="xs" val="blue" color="blue" />
                </div>
              </div>
              <div class="q-ml-md text-h6 text-bold q-mt-md">Descripcion del servicio</div>
              <div class="row q-mb-lg" style="height:60px">
                <div class="col-12 q-px-md text-grey-9 ellipsis-3-lines">{{selec.necesidad ? selec.necesidad.descripcion : selec.descripcion}}</div>
              </div>
              <div class="q-ml-md text-h6 text-bold q-mt-md">Fotos del automovil</div>
              <q-scroll-area
                horizontal
                style="height: 110px;"
                class="q-ml-md"
              >
                <div class="row no-wrap" style="width: 100%">
                  <q-card v-for="(img, index) in selec.necesidad ? selec.necesidad.images : selec.images" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index" @click="imgSelec = baseu + '/' + img, showImg = true">
                    <q-img :src="baseu + '/' + img" spinner-color="white" style="height: 100px; width: 100px" />
                  </q-card>
                </div>
              </q-scroll-area>
              <div v-if="selec.isQuoted != true && selec.status !== 1 && selec.status !== 2" class="row justify-center q-pa-sm q-mt-md">
                <q-btn rounded  color="primary" label="Contactar" no-caps style="width:200px" @click="next()"/>
              </div>
              <div v-else-if="selec.isQuoted == true" class="row justify-center q-pa-sm q-mt-md">
                <div class="text-subtitle1">¡Tu cotización ya fue enviada!</div>
                <div class="text-caption q-mb-xs">Puedes seguir contactando desde el chat</div>
                <q-btn rounded  color="primary" label="Ir al Chat" no-caps style="width:200px" @click="$router.push('chat/' + selec.chat)"/>
              </div>
              <div v-if="selec.opinion">
                <div class="q-ml-md text-h6 text-bold q-mt-md">Comentarios del servicio</div>
                <div class="row" style="height:60px">
                  <div class="col-12 q-px-md text-grey-9 ellipsis-3-lines">{{selec.opinion.opinion}}</div>
                  <div class="col-12 q-ml-xs q-px-md text-bold text-grey-9">Calificación</div>
                  <div class="row q-mb-lg q-ml-md">
                    <q-rating v-model="selec.opinion.rating" size="2em" color="orange" readonly/>
                  </div>
                </div>
              </div>
          </q-card>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="q-pa-none">
          <div class="text-right q-pr-sm q-mt-xs q-mr-xs">Fecha de Solicitud {{selec.fechaCreacion}}</div>
          <div class="column items-center justify-center">
            <div class="text-center text-white q-mt-sm text-h5" :class="`bg-${selec.colorRadio}`" style="width:100%">{{selec.name}}</div>
          </div>
          <div class="text-center text-h6 text-bold q-mt-md">Descripcion del servicio</div>
          <div class="row q-mb-lg" style="height:60px">
            <div class="col-12 q-px-md text-center text-grey-9 ellipsis-3-lines">{{selec.descripcion}}</div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="text-subtitle1 q-ml-md">Envia un mensaje de Contacto</div>
            <q-input class="q-mx-md" filled v-model="form.message" type="textarea" :error="$v.form.message.$error" error-message="Este campo es requerido" @blur="$v.form.message.$touch()"/>
          </div>
          <div class="row justify-around items-center">
            <div class="text-bold">Fecha de termino</div>
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
            <q-btn rounded  color="primary" label="Hablar" no-caps style="width:200px" @click="makeAQuote()"/>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="q-pa-none column items-center">
          <div class="q-mt-xl" style="height: 200px; width: 70%;">
            <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
            <div class="absolute-full column items-center column justify-end">
              <q-icon name="collections" class="text-grey" size="80px"></q-icon>
              <div class="text-bold text-center text-grey">Presupuesto enviado con éxito</div>
            </div>
            </q-img>
          </div>
          <div class="text-h6 text-center text-bold q-mt-xl">¡Tu mensaje fue enviado con éxito!</div>
          <div class="text-h6 text-center text-grey-9 text-subtitle1">Podrás ver el estado de tu solicitud en tu panel de administración de solicitudes.</div>
          <div class="q-pa-sm q-mt-md">
            <q-btn rounded  color="primary" label="Salir" no-caps style="width:200px" @click="finish()"/>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>

    <q-dialog v-model="showImg">
      <q-card>
        <img :src="imgSelec" spinner-color="white" style="height: 100%; width: 100%" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import env from '../../env'
import moment from 'moment'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      ver1: false,
      ver2: false,
      ver3: false,
      verSolicitud: false,
      showImg: false,
      baseu: '',
      baseuPerfil: '',
      imgSelec: '',
      selec: {},
      allSolicitudes: [],
      solicitudes: [],
      allActivas: [],
      allCompletas: [],
      activas: [],
      completas: [],
      slide: 1,
      form: {}
    }
  },
  validations: {
    form: {
      message: { required },
      date: { required },
      price: { required }
    }
  },
  mounted () {
    this.getSolicitudes()
    this.getSolicitudesZona()
    this.baseu = env.apiUrl + '/necesidad_img'
    this.baseuPerfil = env.apiUrl + '/perfil_img/perfil'
  },
  methods: {
    getSolicitudes () {
      this.$api.get('user_info').then(res => {
        if (res) {
          var id = res._id
          this.$api.get('necesidad_by_prov_id/' + id).then(v => {
            if (v) {
              this.allActivas = v.filter(v => v.status === 1)
              this.allCompletas = v.filter(v => v.status === 2)
              this.activas = this.allActivas.slice(0, 3)
              this.completas = this.allCompletas.slice(0, 3)
            }
          })
        }
      })
    },
    getSolicitudesZona () {
      this.$api.get('necesidades').then(v => {
        if (v) {
          this.allSolicitudes = v.map(v => {
            return {
              ...v,
              colorRadio: v.necesidad === 'Urgente (1 a 3 Horas)' ? 'red' : v.necesidad === 'Medio (5 a 24 Horas)' ? 'orange' : 'blue',
              necesidad: null
            }
          })
          this.solicitudes = this.allSolicitudes.slice(0, 3)
        }
      })
    },
    selecData (data) {
      this.selec = data
      this.verSolicitud = true
    },
    verMas (val) {
      if (val === 1) {
        this.ver1 = !this.ver1
        if (this.ver1) {
          this.activas = this.allActivas
        } else {
          this.activas = this.allActivas.slice(0, 3)
        }
      } else if (val === 2) {
        this.ver2 = !this.ver2
        if (this.ver2) {
          this.completas = this.allCompletas
        } else {
          this.completas = this.allCompletas.slice(0, 3)
        }
      } else {
        this.ver3 = !this.ver3
        if (this.ver3) {
          this.solicitudes = this.allSolicitudes
        } else {
          this.solicitudes = this.allSolicitudes.slice(0, 3)
        }
      }
    },
    next () {
      this.slide = 2
    },
    optionsFn2 (datee) {
      var dd = moment().format('YYYY/MM/DD')
      const formattedString = moment(datee).format('YYYY/MM/DD')
      return formattedString >= dd
    },
    async makeAQuote () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Subiendo Cotización, Por Favor Espere...'
        })
        this.form.request_id = this.selec._id
        this.form.client_id = this.selec.creador._id
        await this.$api.post('quotation', this.form).then(res => {
          if (res) {
            this.$q.loading.hide()
            this.slide = 3
          }
        })
      }
    },
    finish () {
      this.slide = 1
      this.verSolicitud = false
      this.getSolicitudesZona()
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
.estilo-titulos {
  background-color: #fff599;
  width: 250px;
  border-radius: 12px
}
</style>
