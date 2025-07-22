from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Wallet, CustomUser

#sender is the CustomUser model
#object instance saved, instance used to create wallet
#created = true false flag, whether the object was created (T) or updated (F)
#kwargs for extrakeywords Django can catch with signal inc case of of more adds 

@receiver(post_save, sender=CustomUser)
def walletForUser(sender, instance, created, **kwargs):
    if created:
        Wallet.objects.create(user=instance)