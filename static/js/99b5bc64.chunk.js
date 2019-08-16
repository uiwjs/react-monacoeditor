(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{580:function(e,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default=';AKA Nick Tracker by Ford_Lawnmower irc.GeekShed.net #Script-Help\n;*****************************************************************************;\n;**Start Setup\n;Change JoinDisplay, below, for On Join AKA Display. On = 1 - Off = 0\nalias -l JoinDisplay { return 1 }\n;Change MaxNicks, below, to the number of nicknames you want to store for each hostmask. I wouldn\'t go over 400 with this ;/\nalias -l MaxNicks { return 20 }\n;Change AKALogo, below, To the text you want displayed before each AKA result.\nalias -l AKALogo { return 06 05A06K07A 06 }\n;**End Setup\n;*****************************************************************************;\nOn *:Join:#: {\n  if ($nick == $me) { .timer 1 1 ialupdateCheck $chan }\n  NickNamesAdd $nick $+($network,$wildsite)\n  if ($JoinDisplay) { .timerNickNames $+ $nick 1 2 NickNames.display $nick $chan $network $wildsite }\n}\non *:Nick: { NickNamesAdd $newnick $+($network,$wildsite) $nick }\nalias -l NickNames.display {\n  if ($gettok($hget(NickNames,$+($3,$4)),0,126) > 1) {\n    echo -g $2 $AKALogo $+(09,$1) $AKALogo 07 $mid($replace($hget(NickNames,$+($3,$4)),$chr(126),$chr(44)),2,-1)\n  }\n}\nalias -l NickNamesAdd {\n  if ($hget(NickNames,$2)) {\n    if (!$regex($hget(NickNames,$2),/~\\Q $+ $replacecs($1,\\E,\\E\\E\\Q) $+ \\E~/i)) {\n      if ($gettok($hget(NickNames,$2),0,126) <= $MaxNicks) {\n        hadd NickNames $2 $+($hget(NickNames,$2),$1,~)\n      }\n      else {\n        hadd NickNames $2 $+($mid($hget(NickNames,$2),$pos($hget(NickNames,$2),~,2)),$1,~)\n      }\n    }\n  }\n  else {\n    hadd -m NickNames $2 $+(~,$1,~,$iif($3,$+($3,~)))\n  }\n}\nalias -l Fix.All.MindUser {\n  var %Fix.Count = $hfind(NickNames,/[^~]+[0-9]{4}~/,0,r).data\n  while (%Fix.Count) {\n    if ($Fix.MindUser($hget(NickNames,$hfind(NickNames,/[^~]+[0-9]{4}~/,%Fix.Count,r).data))) {\n      echo -ag Record %Fix.Count - $v1 - Was Cleaned\n      hadd NickNames $hfind(NickNames,/[^~]+[0-9]{4}~/,%Fix.Count,r).data $v1\n    }\n    dec %Fix.Count\n  }\n}\nalias -l Fix.MindUser { return $regsubex($1,/[^~]+[0-9]{4}~/g,$null) }\nmenu nicklist,query {\n  -\n  .AKA\n  ..Check $$1: {\n    if ($gettok($hget(NickNames,$+($network,$address($1,2))),0,126) > 1) {\n      NickNames.display $1 $active $network $address($1,2)\n    }\n    else { echo -ag $AKALogo $+(09,$1) 07has not been known by any other nicknames while I have been watching. }\n  }\n  ..Cleanup $$1:hadd NickNames $+($network,$address($1,2)) $fix.minduser($hget(NickNames,$+($network,$address($1,2))))\n  ..Clear $$1:hadd NickNames $+($network,$address($1,2)) $+(~,$1,~)\n  ..AKA Search Dialog:dialog $iif($dialog(AKA_Search),-v,-m) AKA_Search AKA_Search\n  -\n}\nmenu status,channel {\n  -\n  .AKA\n  ..AKA Search Dialog:dialog $iif($dialog(AKA_Search),-v,-m) AKA_Search AKA_Search\n  ..Clean All Records:Fix.All.Minduser\n  -\n}\ndialog AKA_Search {\n  title "AKA Search Engine"\n  size -1 -1 206 221\n  option dbu\n  edit "", 1, 8 5 149 10, autohs\n  button "Search", 2, 163 4 32 12\n  radio "Search HostMask", 4, 61 22 55 10\n  radio "Search Nicknames", 5, 123 22 56 10\n  list 6, 8 38 190 169, sort extsel vsbar\n  button "Check Selected", 7, 67 206 40 12\n  button "Close", 8, 160 206 38 12, cancel\n  box "Search Type", 3, 11 17 183 18\n  button "Copy to Clipboard", 9, 111 206 46 12\n}\nOn *:Dialog:Aka_Search:init:*: { did -c $dname 5 }\nOn *:Dialog:Aka_Search:Sclick:2,7,9: {\n  if ($did == 2) && ($did($dname,1)) {\n    did -r $dname 6\n    var %search $+(*,$v1,*), %type $iif($did($dname,5).state,data,item), %matches = $hfind(NickNames,%search,0,w). [ $+ [ %type ] ]\n    while (%matches) {\n      did -a $dname 6 $hfind(NickNames,%search,%matches,w). [ $+ [ %type ] ]\n      dec %matches\n    }\n    did -c $dname 6 1\n  }\n  elseif ($did == 7) && ($did($dname,6).seltext) { echo -ga $AKALogo 07 $mid($replace($hget(NickNames,$v1),$chr(126),$chr(44)),2,-1) }\n  elseif ($did == 9) && ($did($dname,6).seltext) { clipboard $mid($v1,$pos($v1,*,1)) }\n}\nOn *:Start:{\n  if (!$hget(NickNames)) { hmake NickNames 10 }\n  if ($isfile(NickNames.hsh)) { hload  NickNames NickNames.hsh }\n}\nOn *:Exit: { if ($hget(NickNames)) { hsave NickNames NickNames.hsh } }\nOn *:Disconnect: { if ($hget(NickNames)) { hsave NickNames NickNames.hsh } }\nOn *:Unload: { hfree NickNames }\nalias -l ialupdateCheck {\n  inc -z $+(%,ialupdateCheck,$network) $calc($nick($1,0) / 4)\n  ;If your ial is already being updated on join .who $1 out.\n  ;If you are using /names to update ial you will still need this line.\n  .who $1\n}\nRaw 352:*: {\n  if ($($+(%,ialupdateCheck,$network),2)) haltdef\n  NickNamesAdd $6 $+($network,$address($6,2))\n}\nRaw 315:*: {\n  if ($($+(%,ialupdateCheck,$network),2)) haltdef\n}\n\n\n'}}]);