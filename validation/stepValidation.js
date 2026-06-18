export function validateStep(stepNumber, formData) {
  const errors = {};

  switch (stepNumber) {
    case 1:
      if (!formData.nomeVitima?.trim()) {
        errors.nomeVitima = 'Informe o nome da vítima';
      }
      if (!formData.endereco?.trim()) {
        errors.endereco = 'Informe o endereço';
      }
      break;

    case 2:
      if (!formData.data?.trim()) {
        errors.data = 'Informe a data';
      }
      if (!formData.hch?.trim()) {
        errors.hch = 'Informe a hora';
      }
      if (!formData.numeroBO?.trim()) {
        errors.numeroBO = 'Informe o número do B.O.';
      }
      break;

    case 4:
      if (!formData.bombeiros?.some((bombeiro) => bombeiro.nome?.trim())) {
        errors.bombeiros = 'Informe ao menos um bombeiro';
      }
      break;

    case 14:
      if (!formData.responsavelPeloPreenchimento?.trim()) {
        errors.responsavelPeloPreenchimento = 'Informe o responsável pelo preenchimento';
      }
      break;

    default:
      break;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
