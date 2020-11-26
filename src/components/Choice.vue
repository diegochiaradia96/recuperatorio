<template>

  <div class="jumbotron">
    <h2>Respuesta del Choice</h2>
    <hr />

    <table class="table text-left"> 
      <tr>
        <th scope="col">Numero de pregunta</th>
        <th scope="col">Respuesta</th>
      </tr>
      <tr v-for="(cuestion, pregunta) in preguntas" :key="pregunta">
        <td scope="col"> <p>{{ cuestion.pregunta }}</p> </td>
        <td scope="col"> <p>{{ cuestion.respuestas}}</p> </td>
      </tr>
    </table>
  </div>  
</template>

<script>

  export default  {
    name: 'src-components-choice',
    props: [],
    mounted () {

    },
    data () {
      return {
        preguntas: [
          {pregunta: 1, respuestas: ['a']},
          {pregunta: 2, respuestas: ['a','c','e']},
          {pregunta: 3, respuestas: ['c']},
          {pregunta: 4, respuestas: ['b']},
          {pregunta: 5, respuestas: ['b']},
        ]

      }
    },
    methods: {

    },
    computed: {
      respuestasChoice(respuestas) {
        let string = ""
        respuestas.forEach(resp => {
          string = string + " " + resp
        })
        return string
      }

    }
}


</script>

<style scoped lang="css">
  .src-components-choice {

  }
</style>
