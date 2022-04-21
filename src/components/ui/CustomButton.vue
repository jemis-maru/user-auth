<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
button{
  padding: 0.75rem 1.5rem;
  background-color: #0a8d3c;
  border: 1px solid #0a8d3c;
  color: #ffffff;
  cursor: pointer;
  font-weight: bold;
  border-radius: 20px;
  margin-right: 0.5rem;
}

button:hover,
button:active {
  background-color: #bbebcd;
  border-color: #0a8d3c;
  color: #0a8d3c;
}
</style>