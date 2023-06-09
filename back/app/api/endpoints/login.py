from starlette.requests import Request
from fastapi.responses import RedirectResponse
from steamsignin import SteamSignIn
from fastapi import APIRouter, Depends

router = APIRouter()

api_url = "https://j8c204.p.ssafy.io/api/login"

@router.get('/processlogin')
async def pr(request: Request, steam_signin: SteamSignIn = Depends(SteamSignIn)):
    steam_id = steam_signin.ValidateResults(request.query_params)
    redirect_url = "https://j8c204.p.ssafy.io?steam_id={}".format(steam_id)

    return RedirectResponse(url=redirect_url)
