<script>
  import { colorsList } from '../../stores/colorsStore';
  import io from 'socket.io-client'
  const socket = io("localhost:8080")
  let color;

  function chooseColor() {
    socket.emit("client-choose-a-color", {data: color})
  }

  socket.on("server-sent-a-color", (data) => {
      document.body.style.backgroundColor = data.data
      colorsList.update((colors) => {
        colors.push({color:data.data, name: data.name})
        return colors
      })
    })
</script>

<input type="color" bind:value={color}>
<button on:click={chooseColor}>Choose color</button>