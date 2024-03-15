import { useSnackbar, VariantType } from 'notistack';

export default function PopupAlert(text: string, variant: VariantType) {
    const { enqueueSnackbar } = useSnackbar();
    enqueueSnackbar(text, {
        variant,
    });
}